/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    
  
  // Function which renders a signle tweet
  const createTweetElement = function(obj) {
    
    // Escape function which prevents code from Cross site sripting --- there is a bug that recreates the last tweet on submission but changes after refresh
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
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
  };

  // Function which renders a database of tweets for newest to oldest
  const renderTweets = function(tweets) {
    $('.previousTweets').empty();
    tweets.forEach((x) => {
      let $tweet = createTweetElement(x);
      // Add the html structure to the parent using class
      $('.previousTweets').prepend($tweet);
    });
  };
  
  // Get database for loading tweets
  const loadTweets = function() {
    $.ajax("/tweets",{method: "GET"})
      .then(function(data) {
        renderTweets(data);
      });
  };

  // rendering of all the saved tweets
  loadTweets();

  // Submission handler
  $('.new-tweet').submit((event)=> {
    event.preventDefault();  // Stops default action from submit button

    let wordLength = $('#tweet-text').val().length; // Getting input length to check error
    let urlAsQuery = $('form').serialize(); //Convert user text input as queryform
    
    
    if (wordLength === 0) {  // Check for 0 input
      $('.hiddenEmpty').slideDown("slow");
    } else if (wordLength > 140) { // if greater that 140 then there are too many words
      $('.hiddenExceed').slideDown("slow");
    } else {
      
     


      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: urlAsQuery
      })
        .then(()=> {
          
          loadTweets()

           // Resetting Errors.
          $('.hiddenEmpty').hide();
          $('.hiddenExceed').hide();
          $('textarea').val("");
          $('.counter').val(140);
        });
      
    }
  });
});
