/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    
  // Escape function which prevents code from Cross site sripting --- there is a bug that recreates the last tweet on submission but changes after refresh
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };


  // Function which renders a database of tweets for newest to oldest
  const renderTweets = function(tweets) {
    for(let i = tweets.length-1; i >= 0; i--) {
      let $tweet = createTweetElement(tweets[i]);
      // Add the html structure to the parent using class
      $('.previousTweets').append($tweet);
    }

  }
  // Function which renders latest tweet once submitted 'prepend is needed to add it to the top'
  const renderLatestTweet = function(tweets) {
    let latestTweet = tweets.length-1;
    let $tweet = createTweetElement(tweets[latestTweet]);
    // Add the html structure to the parent using class
    $('.previousTweets').prepend($tweet);
  }
  
  // Function which renders a signle tweet
  const createTweetElement = function (obj) {
    
    let $tweet =  `
    <article class="tweet">
    
    <header>
    <div class="headerLeft">
    <img src="${obj.user.avatars}"/>
    <span class="userName">${obj.user.name}</span>
    </div>
    <span class="userHandle">${obj.user.handle}</span>
    </header>
    
    <span class="userTweet">${escape(obj.content.text)}</span>
    
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
  
  // Get database for loading tweets
  const loadTweets = function() {
    $.ajax("/tweets",{method: "GET"})
    .then(function(data) {
      renderTweets(data);
    });
  }

  // rendering of all the saved tweets
  loadTweets();

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
      
      $('textarea').val("");
      $('.counter').val(140);
      
      $.ajax("/tweets",{method: "GET"}) //Load latest tweet can user load tweets refactoreded with a call back
      .then(function(data) {
        renderLatestTweet(data);
      });
      
    }
  });


});
