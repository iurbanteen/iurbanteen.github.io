var currentScore;
var livesRemaining;
var gameLengthSeconds = 3;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var sounds = {
    backgroundMusic: null,
    gameOver: null
}
var images = {
    groundImage: null,
    decorationImage: null
}
var backgroundXLoc = 0;

// everything in here happens once the HTML document is loaded.
$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("2d");
    $('#gameStart').show();
    // initialization routine(s)
    initializeListeners();
    initializeAudio();
    initializeGraphics ();
});

// register the key press listener
function initializeListeners() {
    document.onkeydown = keyEventHandler;
    // will need to add 'key up' for continual movement
}
// load all the sounds before we start
function initializeAudio() {
    sounds.backgroundMusic = new Audio("audio/386412__setuniman__restless-1o69.wav");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .25;
    sounds.backgroundMusic.load();
    sounds.backgroundMusic.onLoadedData = loadComplete;
    sounds.gameOver = new Audio("audio/76376__deleted-user-877451__game-over.wav");
    sounds.gameOver.load();
    sounds.gameOver.onLoadedData = loadComplete;
}

function initializeGraphics(){
  images.groundImage = new Image();
  images.groundImage.src = "images/ground_image_map.png";
  images.groundImage.onload = loadComplete;
  images.decorationImage = new Image();
  images.decorationImage.src = "images/decoration_image_map.png";
  images.decorationImage.onload = loadComplete;
}

var loadedItems = 0;
function loadComplete() {
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 4);
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
    drawPlatform();
    moveBackground();
}
var backgroundTimer;
function moveBackground() {
    backgroundTimer = setInterval(function() {
      $('#playfield').css('background-position', --backgroundXLoc + 'px 0');
    }, 10);
}
function haltBackground() {
    clearInterval(backgroundTimer);
}

// end the game
function gameEnd() {
    sounds.backgroundMusic.pause();
    sounds.gameOver.play();
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

function move(direction) {
    console.log(`Move ${direction}`);
    // add the motion handling
}

function drawPlatform() {
  var x = 20;
  var y = 100;
  context.drawImage(images.groundImage, 0,0,100,100,x,y,20,20);
  context.drawImage(images.groundImage, 0,100,100,100,x+20,y,20,20);
  context.drawImage(images.groundImage, 0,)
}
