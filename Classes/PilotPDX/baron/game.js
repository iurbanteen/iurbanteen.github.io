var currentScore;
var livesRemaining;
var gameLengthSeconds = 10;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var jumpMan;
var sounds = {
    backgroundMusic: null,
    gameOver: null,
    die: null,
    coinCollect: null,
    jumpSound: null,
    enemyKill: null,
    powerUp: null,
    levelEnd: null,
    itemSelect: null
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
// register the key press listener
function initializeListeners() {
    document.onkeydown = keyEventHandler;
    // will need to add 'key up' for continual movement
}
 function drawJumpMan(){
    context.drawImage(jumpMan, 150, 110);

 }
 function initializeImage(){
   jumpMan = new Image();
   jumpMan.src = "images/Persona.png"
   jumpMan.onload = imageLoaded;
 }
 function imageLoaded(){}

// load all the sounds before we start
function initializeAudio() {
    sounds.backgroundMusic = new Audio("audio/backgroundMusic.wav");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .55;
    $(sounds.backgroundMusic).on('loadeddata', loadComplete);
    sounds.backgroundMusic.load();

    sounds.gameOver = new Audio("audio/gameOver.m4a");
    $(sounds.gameOver).on('loadeddata', loadComplete);
    sounds.gameOver.load();

    sounds.coinCollect = new Audio("audio/coinCollect.wav");
    $(sounds.coinCollect).on('loadeddata', loadComplete);
    sounds.coinCollect.load();

    sounds.jumpSound = new Audio("audio/jumpSound.wav");
    $(sounds.jumpSound).on('loadeddata', loadComplete);
    sounds.jumpSound.load();

    sounds.enemyKill = new Audio("audio/enemyKill.wav");
    $(sounds.enemyKill).on('loadeddata', loadComplete);
    sounds.enemyKill.load();

    sounds.powerUp = new Audio("audio/powerUp.m4a");
    $(sounds.powerUp).on('loadeddata', loadComplete);
    sounds.powerUp.load();

    sounds.levelEnd = new Audio("audio/levelEnd.m4a");
    $(sounds.levelEnd).on('loadeddata', loadComplete);
    sounds.levelEnd.load();

    sounds.itemSelect = new Audio("audio/itemSelect.wav");
    $(sounds.itemSelect).on('loadeddata', loadComplete);
    sounds.itemSelect.load();


}
var loadedItems = 0;
function loadComplete() {
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 8);
}
// start the game
function gameStart() {
    if (!isEveryingLoaded)
        return;
        drawJumpMan();
    gameStarted = true;
    $('#gameStart').hide();
    $('#gameOver').hide();
    sounds.backgroundMusic.play();
    sounds.gameOver.currentTime = 0; // rewind the 'game over' sound
    startTimer();
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

    }  else if (event.keyCode == 73) {
      sounds.levelEnd.play();


    }


        // spacebar event - used for game start or jump ?
    }


function move(direction) {
    console.log(`Move ${direction}`);
    // add the motion handling
}
