/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  
  // Test / driver code (temporary). Eventually will get this from the server.
  
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }
  
  function createTweetElement(obj) {
    
    const renderedTweet =  `
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
          <span>${obj.created_at}</span>
          <div class="articleIcons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>

      </article>
      `;

    return renderedTweet;
  }
  
  // Call function to set html structure
  const $tweet = createTweetElement(tweetData);
  
  console.log("works");
  // Add the html structure to the parent using class
  $('.previousTweets').append($tweet);
  
});
