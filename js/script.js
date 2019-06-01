// Arrays to hold values for the game
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Global variables
var started = false;
var level = 0;
var clicks = 0;

// Event Listener for button clicks
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  pressed(userChosenColor);
  playSound(userChosenColor);
  ++clicks;
  checkAnswer();
});

// Function to go to the next sequence of the game
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  ++level;
  $("#level-title").html("Level " + level);
  for(let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      animate(gamePattern[i]);
      playSound(gamePattern[i]);
    }, i * 250);
  }
  // animate(randomChosenColor);
  // playSound(randomChosenColor);
}

// Function to play sound when the next sequences or user button click happens
function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

// Function to animate the button when the next sequence happens
function animate(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
}

// Function to show "pressed" animation for user button clicks
function pressed(color) {
  $("#" + color).toggleClass("pressed");
  setTimeout(function() {
    $("#" + color).toggleClass("pressed");
  }, 100);

}

// Function to detect user keyboard input to start game
$(document).on("keypress", function() {
  if (!started) {
    gamePattern = [];
    userClickedPattern = [];
    clicks = 0;
    started = true;
    $(".unclickable").css("display", "none");
    nextSequence();
  }
});

$(".mobile-btn").on("click", function() {
  if (!started) {
    gamePattern = [];
    userClickedPattern = [];
    clicks = 0;
    started = true;
    $(".unclickable").css("display", "none");
    $(".mobile-btn").css("display", "none");
    nextSequence();
  }
});

// Function to check answer
function checkAnswer() {
  console.log("gamePattern: " + gamePattern);
  console.log("userClickedPattern: " + userClickedPattern);
  console.log("level: " + level);
  console.log("clicks: " + clicks);
  if (gamePattern[clicks - 1] != userClickedPattern[clicks - 1]) {
    console.log("game over");
    $("#level-title").html("Game over! Press A Key to Start");
    $(".unclickable").css("display", "block");
    started = false;
    level = 0;
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $(".mobile-btn").css("display", "block");
    return;
  } else {
    console.log("success - clicks = " + clicks);
  }
  if (userClickedPattern.length == level) {
    clicks = 0;
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}









//
