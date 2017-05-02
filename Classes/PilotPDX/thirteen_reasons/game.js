var currentScore;
var livesRemaining;
var gameLengthSeconds = 3;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var sounds = {
    backgroundMusic: null,
    gameOver: null,
    tankfire: null,
    godzillasteps: null,
    pscream: null,
    wscream: null,
    oplane: null,
    explosion: null,
    nooahhh: null,
    roar: null,
    footsteps: null

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
  console.log("start file boot up");
    sounds.backgroundMusic = new Audio("audio/384695__waveplay__atmospheric-ambient-fade.wav");
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = .25;
    $(sounds.backgroundMusic).on('loadeddata', loadComplete);
    sounds.backgroundMusic.load();

    sounds.gameOver = new Audio("audio/76376__deleted-user-877451__game-over.wav");
    $(sounds.gameOver).on('loadeddata', loadComplete);
    sounds.gameOver.load();

    sounds.tankfire = new Audio("audio/189344__qubodup__tanks-shooting.flac");
    $(sounds.tankfire).on('loadeddata', loadComplete);
    sounds.tankfire.load();

    sounds.pscream = new Audio("audio/42847__freqman__psycho-scream-1.wav");
    $(sounds.pscream).on('loadeddata', loadComplete);
    sounds.pscream.load();

    sounds.roar = new Audio("audio/48673__sea-fury__monster-2.wav");
    $(sounds.roar).on('loadeddata', loadComplete);
    sounds.roar.load();

    sounds.wscream = new Audio("audio/132106__sironboy__woman-scream.wav");
    $(sounds.wscream).on('loadeddata', loadComplete);
    sounds.wscream.load();

    sounds.oplane = new Audio("audio/23519__percy-duke__aeroplane-passing-overhead.mp3");
    $(sounds.oplane).on('loadeddata', loadComplete);
    sounds.oplane.load();

    sounds.explosion = new Audio("audio/235968__tommccann__explosion-01.wav");
    $(sounds.explosion).on('loadeddata', loadComplete);
    sounds.explosion.load();

    sounds.nooahhh = new Audio("audio/240223__xtrgamr__nooooaaaah-01.wav");
    $(sounds.nooahhh).on('loadeddata', loadComplete);
    sounds.nooahhh.load();

    sounds.footsteps = new Audio("audio/268829__kwahmah-02__huge-footsteps.wav");
    $(sounds.footsteps).on('loadeddata', loadComplete);
    sounds.footsteps.load();

}
var loadedItems = 0;
function loadComplete() {
  console.log("download finished")
    loadedItems += 1;
}

function isEveryingLoaded() {
    return (loadedItems == 10);
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
