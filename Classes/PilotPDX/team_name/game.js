var currentScore;
var livesRemaining;
var gameLengthSeconds = 3;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var sounds = {
    backgroundMusic: null,
    shoots: null,
    geeseNoise: null,
    flapping: null,
    splashOnWater: null,
    collidingNoise: null,
    buyingNoise: null,
    bossSpawning: null,
    bossDefeat: null,
    bossDamage: null,
    gameOver: null
}
var backgroundXLoc = 0;

// everything in here happens once the HTML document is loaded.
$(function() {
  console.log("help");
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
  console.log("initialize audio");
  sounds.backgroundMusic = new Audio("audio/undertale.m4a");
  sounds.backgroundMusic.loop = true;
  sounds.backgroundMusic.volume = .25;
  $(sounds.backgroundMusic).on('loadeddata', loadComplete);
  sounds.backgroundMusic.load();
  sounds.gameOver = new Audio("audio/gameOverSound.m4a");
  sounds.gameOver.load();
  $(sounds.gameOver).on('loadeddata', loadComplete);
  sounds.bossDamage = new Audio("audio/bossdamage.wav")
  sounds.bossDamage.load();
  $(sounds.bossDamage).on('loadeddata', loadComplete);
  sounds.flapping = new Audio("audio/flap1.wav")
  sounds.flapping.load();
  $(sounds.flapping).on('loadeddata', loadComplete);
}
var loadedItems = 0;
function loadComplete() {
  console.log("load complete");
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 4);
}
// start the game
function gameStart() {
    if (!isEveryingLoaded())
        return;
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
      $('#playfield').css('background-position', '0 '+ (++backgroundXLoc) + 'px ');
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
