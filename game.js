//creating a new array to hold the sequence "red", "blue", "green", "yellow"
var buttonColours = ["red", "blue", "green", "yellow"];

//creating a new empty array for gamePattern
var gamePattern = [];

//creating a new empty array for userClickedPattern
var userClickedPattern = [];

//to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

var level = 0;

//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //to store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");

  //Add the contents of userChosenColour to the end of this userClickedPattern
  userClickedPattern.push(userChosenColour);

  //when a user clicks on a button, the corresponding sound should be played
  playSound(userChosenColour);

  animatePress(userChosenColour);

  //after a user has clicked and chosen their answer, passing the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  //to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong"
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //Call nextSequence() after a 1000 millisecond delay
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      //play this sound if the user got one of the answers wrong
      playSound("wrong");
      //apply this gameover class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //if the user gets the sequence wrong
      startOver();
    }
}


function nextSequence() {
  // Once nextSequence() is triggered after checking in checkAnswer, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

  //increase the level by 1 every time nextSequence() is called.
  level++;
  //update the h1 with this change in the value of level
  $("#level-title").text("Level " + level);

  //generate a new random number between 0 and 3, and store it in a randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //using the randomNumber to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //Add the new randomChosenColour generated to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  //jQuery to select the button with the same id as the randomChosenColour
  //jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //it will work for both playing sound in sequence and when the user clicks a button
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  //jQuery to add this pressed class from css to the button that gets clicked "it will add a box shadow and changes the background colour to grey"
  $("#" + currentColor).addClass("pressed");
  //remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  //Javascript to play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
