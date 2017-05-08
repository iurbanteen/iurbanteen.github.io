var xOffset;
var yOffset;
var playfield;
var context;
var bikeBoySize = 60;
var bheelAmount = 25;
var food = [];
var bheelSize = 72;
var bheelImage;
var bikeBoyImage;
var counter;
var started = false;var currentScore;
var livesRemaining;
var gameLengthSeconds = 999999;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var sounds = {
    backgroundMusic: null,
    die: null,
    jumpSound: null,
    pickUpCoin: null,
    crowSound: null,
    ratSqueak: null
}
var backgroundXLoc = 0;

// everything in here happens once the HTML document is loaded.
$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("2d");
    // initialization routine(s)
    initializeListeners();
    initializeAudio();
    initializeImage();
});

function drawBikeBoy(){
  context.drawImage(bikeBoyImage, 1, 1);

}
function initializeImage(){
  Hero.image = new Image();
  Hero.image.src = "brashbluebikeboy.png";
  Hero.image.onLoad = imageLoaded;
}
function imageLoaded(){}
// register the key press listener
function initializeListeners() {
    document.onkeydown = keyDownEventHandler;
    document.onkeyup = keyUpEventHandler;
    // will need to add 'key up' for continual movement
}
// load all the sounds before we start
function initializeAudio() {
    sounds.backgroundMusic = new Audio("audio/Casual-friday-electronic-beat-music.mp3");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .25;
    $(sounds.backgroundMusic).on('loadeddata', loadComplete);
    sounds.backgroundMusic.load();

    sounds.die = new Audio("audio/die.wav");
    $(sounds.die).on('loadeddata', loadComplete);
    sounds.die.load();
    sounds.die.volume = 1;

    sounds.jumpSound = new Audio("audio/jumpsound.m4a");
    $(sounds.jumpSound).on('loadeddata', loadComplete);
    sounds.jumpSound.load();

    sounds.pickUpCoin = new Audio("audio/coinSound.wav");
    $(sounds.pickUpCoin).on('loadeddata', loadComplete);
    sounds.pickUpCoin.load();

    sounds.crowSound = new Audio("audio/crowSound.wav");
    $(sounds.crowSound).on('loadeddata', loadComplete);
    sounds.crowSound.load();

    sounds.ratSqueak = new Audio("audio/ratsqueak.wav");
    $(sounds.ratSqueak).on('loadeddata', loadComplete);
    sounds.ratSqueak.load();
  }
var loadedItems = 0;
function loadComplete() {
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 6);
}
// start the game
function gameStart() {
    if (!isEveryingLoaded)
        return;
      //drawBikeBoy();
    gameStarted = true;
    $('#gameStart').hide();
    $('#gameOver').hide();
    sounds.backgroundMusic.play();
    sounds.die.currentTime = 0; // rewind the 'game over' sound
    startTimer();
    moveBackground();
    Hero.init(380,445);
    startAnimation();
}
var backgroundTimer;
function moveBackground() {
    backgroundTimer = setInterval(function() {
      $('#playfield').css('background-position', --backgroundXLoc + 'px 0');
    }, .1);
}
function haltBackground() {
    clearInterval(backgroundTimer);
}

// end the game
function gameEnd() {
    sounds.backgroundMusic.pause();
    sounds.die.play();
    gameStarted = false;
    haltBackground();
    $('#gameOver').show();
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
var move;
function startAnimation(){
  move = setInterval(function() {
    animate();
  },1);
}
function stopAnimation(){
  clearInterval(move);
}
function animate(){
  Hero.draw();
}


// Translate key press event into direction
function keyDownEventHandler(event) {
   if (KEY_CODES[event.keyCode]) {
     event.preventDefault();
     KEY_STATUS[KEY_CODES[event.keyCode]] = true;
   }
}
function keyUpEventHandler(event) {
  if (KEY_CODES[event.keyCode]) {
    event.preventDefault();
    KEY_STATUS[KEY_CODES[event.keyCode]] = false;
  }
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

var Hero={
  x:0,
  y:0,
  speed:1,
  image:null,
  init(x,y){
    this.x=x;
    this.y=y;
  },
  draw(){
    console.log('draw');
    context.clearRect(this.x,this.y,50,60);
    if (KEY_STATUS.left || KEY_STATUS.right) {
      if (KEY_STATUS.left) {
        this.x -= this.speed
        if (this.x <= 100) // Keep player within the screen
          this.x = 100;
      } else if (KEY_STATUS.right) {
        this.x += this.speed
        if (this.x >= playfield.width - 115)
          this.x = playfield.width - 115;
      }
    }
    context.drawImage(this.image, this.x, this.y, 50,60);
  }
}
