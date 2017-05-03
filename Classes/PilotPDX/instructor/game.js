var currentScore;
var livesRemaining;
var gameLengthSeconds = 5;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var sounds = {
    backgroundMusic: null,
    gameOver: null
}
var dude = {
  image : null,
  standing : {x : 5, y : 2, width: 52, height: 96},
  running : [
    {x : 148, y : 4, width: 46, height: 93},
    {x : 212, y : 2, width: 46, height: 95},
    {x : 271, y : 2, width: 58, height: 92},
    {x : 335, y : 3, width: 58, height: 92},
    {x : 148, y : 102, width: 47, height: 91},
    {x : 208, y : 102, width: 55, height: 92},
    {x : 268, y : 99, width: 60, height: 87},
    {x : 335, y : 100, width: 54, height: 94}
  ],
  jumping : { x: 271, y: 2, width: 58, height: 91}
}

var mainCharacter;
var backgroundXLoc = 0;

// everything in here happens once the HTML document is loaded.
$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("2d");
    // initialization routine(s)
    initializeListeners();
    initializeAudio();
    initializeImages();
});

// register the key press listener
function initializeListeners() {
    document.onkeydown = keyDownEventHandler;
    document.onkeyup = keyUpEventHandler;
    // will need to add 'key up' for continual movement
}
// load all the sounds before we start
function initializeAudio() {
    sounds.backgroundMusic = new Audio("audio/386412__setuniman__restless-1o69.wav");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .25;
    sounds.backgroundMusic.onLoadedData = loadComplete;
    sounds.backgroundMusic.load();
    sounds.gameOver = new Audio("audio/76376__deleted-user-877451__game-over.wav");
    sounds.gameOver.onLoadedData = loadComplete;
    sounds.gameOver.load();
}
function initializeImages(){
  dude.image = new Image();
  dude.image.onload = loadedImage;
  mainCharacter = new GameCharacter();
  mainCharacter.init(Math.round((playfield.width - dude.standing.width)/2), 460, dude, playfield, context);
  dude.image.src = "images/Mario.png";

}

function loadedImage(){
  console.log("Loaded image");
//  context.drawImage(dude.image, dude.standing.x, dude.standing.y,
//    dude.standing.width, dude.standing.height,
//    Math.round((playfield.width - dude.standing.width)/2), 460, dude.standing.width, dude.standing.height);
  mainCharacter.draw();
  loadComplete();
}

var loadedItems = 0;
function loadComplete() {
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 3);
}
// start the game
function gameStart() {
    if (!isEveryingLoaded)
        return;
    gameStarted = true;
    $('#gameStart').hide();
    $('#gameOver').hide();
    sounds.backgroundMusic.play();
    sounds.gameOver.currentTime = 0; // rewind the 'game over' sound

    startTimer();
    moveBackground();
    moveCharacter();

}
// end the game
function gameEnd() {
    haltCharacter();
    sounds.backgroundMusic.pause();
    sounds.gameOver.play();
    gameStarted = false;
    haltBackground();
    $('#gameOver').show();
}

var characterTimer;

function moveCharacter(){
  characterTimer = setInterval(function() {
    mainCharacter.step();
    mainCharacter.draw();
  }, 100);
}
function haltCharacter(){
  clearInterval(this.characterTimer);
  mainCharacter.halt();
}

var backgroundTimer;
function moveBackground() {
    backgroundTimer = setInterval(function() {
      $('#playfield').css('background-position', --backgroundXLoc + 'px 0');
    }, 1);
}
function haltBackground() {
    clearInterval(backgroundTimer);
}




// update the onscreen timer
function updateClock(secondsRemaining) {
    $('#timerValue').text(secondsRemaining);
}

// Start a background timer to countdown
function startTimer() {
    timedCounter = gameLengthSeconds;
    updateClock(timedCounter);
    var interval = setInterval(function() {
        if (timedCounter > 0) {
            timedCounter -= 1;
        } else {
            // we've reached '0', stop the timer
            clearInterval(interval);
            gameEnd();
        }
        updateClock(timedCounter);
    }, 1000);
}

// Translate key press event into direction
function keyDownEventHandler(event) {
  if (event.keyCode == 38){
    event.preventDefault();
    if (mainCharacter.moving && !mainCharacter.jumping){
      mainCharacter.jump();
    }
  }
}
function keyUpEventHandler(event) {
  if (KEY_CODES[event.keyCode]) {
    event.preventDefault();
    KEY_STATUS[KEY_CODES[event.keyCode]] = false;
  }
}

function move(direction) {
    console.log(`Move ${direction}`);
    // add the motion handling
}

// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}
// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[ KEY_CODES[ code ]] = false;
}



function GameCharacter() {
	this.init = function(x, y, character, canvas, context) {
		// Default variables
		this.x = x;
		this.y = y;
    this.height = 0;
    this.character = character;
    this.context = context;
    this.canvas = canvas;
    this.moving = false;
    this.jumping = false;
    this.currentPose = character.standing;
    this.moveIndex = 0;
    this.jumpIndex = -1;
    this.jumpArc = [20,40,60,80,60,40,20];
	}
  this.draw = function(){
    console.log(`Draw at height : ${this.y + this.height}`);
    this.context.drawImage(this.character.image, this.currentPose.x, this.currentPose.y,
      this.currentPose.width, this.currentPose.height,
      this.x, this.y - this.height, this.currentPose.width, this.currentPose.height);
  }

  this.step = function(){
    this.moving = true;
    this.context.clearRect(this.x,this.y - this.height,this.currentPose.width,this.currentPose.height );
    if (this.jumping){
      this.jumpIndex++;
      if (this.jumpIndex < this.jumpArc.length){
          this.height = this.jumpArc[this.jumpIndex];
      } else {
        this.height = 0;
        this.jumping = false;
        this.jumpIndex = -1;
      }
      this.currentPose = this.character.jumping;
    } else {
      this.currentPose = this.character.running[this.moveIndex % (this.character.running.length)];
    }
    this.moveIndex++;
  }

  this.halt = function(){
    this.moving = false;
    this.jumping = false;
    this.context.clearRect(this.x,this.y - this.height,this.currentPose.width,this.currentPose.height );
    this.height = 0;
    this.currentPose = this.character.standing;
    this.draw();
  }
  this.jump = function(){
    this.jumping = true;
  }

}
