var currentScore;
var livesRemaining;
var gameLengthSeconds = 3;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var sounds = {
    backgroundMusic : null,
    gameOver : null
}

// everything in here happens once the HTML document is loaded.
$(function () {
   // initialize anything here
   playfield = document.getElementById('playfield');
   context = playfield.getContext("2d");
   // initialization routine(s)
   initializeListeners();
   initializeAudio();

});

function initializeListeners(){
  document.onkeydown = keyEventHandler;
}

function initializeAudio(){
  sounds.backgroundMusic = new Audio("audio/386412__setuniman__restless-1o69.wav");
	sounds.backgroundMusic.loop = true;
	sounds.backgroundMusic.volume = .25;
	sounds.backgroundMusic.load();
	sounds.gameOver = new Audio("audio/76376__deleted-user-877451__game-over.wav");
	sounds.gameOver.load();
}

function gameStart(){
  gameStarted = true;
  $('#gameStart').hide();
  $('#gameOver').hide();

  sounds.backgroundMusic.play();
  startTimer();
}

function gameEnd(){
  gameStarted = false;
  sounds.backgroundMusic.pause();
	sounds.gameOver.currentTime = 0;
	sounds.gameOver.play();
	$('#gameOver').show();
}

function updateClock( secondsRemaining ){
  $('#timerValue').text(secondsRemaining);
}

function startTimer(){
  timedCounter = gameLengthSeconds;
  updateClock(timedCounter);
  var interval = setInterval(function() {
    if (timedCounter >0){
      timedCounter -= 1;
    } else {
      clearInterval(interval);
      gameEnd();
    }
    updateClock( timedCounter );
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
