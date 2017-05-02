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
  context.drawImage(bikeBoyImage, 130, 80);

}
function initializeImage(){
  bikeBoyImage = new Image();
  bikeBoyImage.src = "images/brashbluebikeboy.png";
  bikeBoyImage.onLoad = imageLoaded;
}
function imageLoaded(){}
// register the key press listener
function initializeListeners() {
    document.onkeydown = keyEventHandler;
    // will need to add 'key up' for continual movement
}
// load all the sounds before we start
function initializeAudio() {
    sounds.backgroundMusic = new Audio("audio/Casual-friday-electronic-beat-music.mp3");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .25;
    sounds.backgroundMusic.load();
    sounds.backgroundMusic.onLoadedData = loadComplete;
    sounds.die = new Audio("audio/die.wav");
    sounds.die.load();
    sounds.die.onLoadedData = loadComplete;
    sounds.die.volume = 1;
    sounds.jumpSound = new Audio("audio/jumpsound.m4a");
    sounds.jumpSound.load();
    sounds.jumpSound.onLoadedData = loadComplete;
    sounds.pickUpCoin = new Audio("audio/coinSound.wav");
    sounds.pickUpCoin.load();
    sounds.pickUpCoin.onLoadedData = loadComplete;
    sounds.crowSound = new Audio("audio/crowSound.wav");
    sounds.crowSound.load();
    sounds.crowSound.onLoadedData = loadComplete;
    sounds.ratSqueak = new Audio("audio/ratsqueak.wav");
    sounds.ratSqueak.load();
    sounds.ratSqueak.onLoadedData = loadComplete;
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
      drawBikeBoy();
    gameStarted = true;
    $('#gameStart').hide();
    $('#gameOver').hide();
    sounds.backgroundMusic.play();
    sounds.die.currentTime = 0; // rewind the 'game over' sound
    startTimer();
    moveBackground();
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

// Translate key press event into direction
function keyEventHandler(event) {
  console.log(`Key Code ${event.keyCode}`);
    if (event.keyCode == 38) {
        move('up');
        sounds.jumpSound.play();
    } else if (event.keyCode == 39) {
        move('right');
    } else if (event.keyCode == 40) {
        move('down');
    } else if (event.keyCode == 37) {
        move('left');
    } else if (event.keyCode == 75) {
        sounds.crowSound.play();
    } else if (event.keyCode == 74) {
        sounds.ratSqueak.play();
    } else if (event.keyCode == 186) {
        sounds.pickUpCoin.play();
    } else if (event.keyCode == 76) {
        sounds.die.play();
    }
}

function move(direction) {
    console.log(`Move ${direction}`);
    // add the motion handling
}
