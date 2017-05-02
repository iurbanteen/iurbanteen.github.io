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
var backgroundXLoc = 0;

// everything in here happens once the HTML document is loaded.
$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("2d");
    // initialization routine(s)
    initializeListeners();
    initializeAudio();

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
    sounds.landingonPlatform = new Audio("audio/86005__nextmaking__landing-on-the-ground.aif");
    sounds.landingonPlatform.load();
    sounds.landingonPlatform.onLoadedData = loadComplete;
    sounds.attack = new Audio("audio/216200__rsilveira-88__cartoon-punch-04.wav");
    sounds.attack.load();
    sounds.attack.onLoadedData = loadComplete;
    sounds.levelUp = new Audio("audio/320657__rhodesmas__level-up-03.wav");
    sounds.levelUp.load();
    sounds.levelUp.onLoadedData = loadComplete;
}
var loadedItems = 0;
function loadComplete() {
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 2);
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
    sounds.levelUp.play();
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
        // spacebar event - used for game start or jump ?
    }
}

function move(direction) {
    console.log(`Move ${direction}`);
    // add the motion handling
}
