var currentScore;
var livesRemaining;
var gameLengthSeconds = 30;
var timedCounter;
var gameStarted = false;
var playfield;
var context;

// everything in here happens once the HTML document is loaded.
$(function () {
   // initialize anything here
   playfield = document.getElementById('playfield');
   context = playfield.getContext("2d");
   // initialization routine(s)
   initializeListeners();

});

function initializeListeners(){
  document.onkeydown = keyEventHandler;
}

function gameStart(){
  gameStarted = true;
  timedCounter = gameLengthSeconds;
  startTimer();
}

function gameEnd(){
  gameStarted = false;
}

function updateClock( secondsRemaining ){
  // update on screen clock
}

function startTimer(){
  var interval = setInterval(function() {
    if (timedCounter >0){
      timedCounter -= 1;
      updateClock( timedCounter );
      if (timedCounter == 1) {
        // gameEndSound.play(); // play sound with 1 sec. remaining
      }
    } else {
      clearInterval(interval);
      gameEnd();
    }
  },1000);
}

// Translate key press event into direction
function keyEventHandler(event){
  if (event.keyCode == 38) {
    move('up');
  } else if (event.keyCode == 39) {
    move('right');
  } else if (event.keyCode == 40) {
    move('down');
  } else if (event.keyCode == 37) {
    move('left');
  } else if (event.keyCode == 32) {
    // spacebar event - used for game start or jump ?
  }
}


function move(direction){
    console.log(`Move ${direction}`);
  // add the motion handling
}
