/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // Function which renders a database of tweets
  const renderTweets = function(tweets) {
    tweets.forEach((x) => {
      let $tweet = createTweetElement(x);
      // Add the html structure to the parent using class
      $('.previousTweets').append($tweet);
    })
  }
  
  // Function which renders a signle tweet
  const createTweetElement = function (obj) {
    
    let $tweet =  `
    <article class="tweet">
    
    <header>
    <div class="headerLeft">
    <i class="fa-regular fa-user"></i>
    <span class="userName">${obj.user.name}</span>
    </div>
    <span class="userHandle">${obj.user.handle}</span>
    </header>
    
    <span class="userTweet">${obj.content.text}</span>
    
    <footer>
    <span>${timeago.format(obj.created_at)}</span>
    <div class="articleIcons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
    
    </article>
    `;
    
    return $tweet;
  }
  
  // Submission handler


  
  $('.new-tweet').submit((event)=>{
    event.preventDefault();
    let urlAsQuery = $('form').serialize();
    if (urlAsQuery.length === 5) {  // output has a min value of 5 'text=', therefore if value = 5 there is no input
      alert("Unable to tweet, input is empty!");
    } else if (urlAsQuery.length > 145) { // if greater that 145 then there are too many words, alternative is $('.counter').val()
      alert("Exceed character limit!")
    } else {

      $.ajax( {
        url: "/tweets",
        method: 'POST',
        data: urlAsQuery
      })
    }
    
  });
  
  // Get database for loading tweets
  const loadTweets = function() {
    $.ajax("/tweets",{method: "GET"})
    .then(function(data) {
      renderTweets(data);
    });
  }

  loadTweets();

});
