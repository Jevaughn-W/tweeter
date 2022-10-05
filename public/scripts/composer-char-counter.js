$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    let charRemaining = 140;
    charRemaining -= this.value.length;  // Accesses the value of the input and track how much is used

    const counterElement = $(this).next().children()[1];  // Finds and accesses the next elements and access its children
    counterElement.value = charRemaining;

    if (charRemaining < 0) {  // Edits the CSS on the character counter
      $(counterElement).addClass("negative");
    } else {
      $(counterElement).removeClass("negative");
    }
  
  });

});