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
var groundShapes = {
  1: [0, 0, 100, 100],
  2: [0, 100, 100, 100],
  3: [0, 200, 100, 100],
  4: [0, 300, 100, 100],
  5: [0, 400, 100, 100],
  6: [0, 500, 100, 100],
  7: [0, 600, 100, 100],
  8: [0, 700, 100, 100],
  9: [0, 800, 100, 50],
  10: [0, 850, 100, 50],
  11: [0, 900, 100, 50],

  12: [0, 950, 100, 100],
  13: [0, 1050, 100, 100],
  14: [0, 1150, 100, 100],
  15: [0, 1250, 100, 100],
  16: [0, 1350, 100, 100],
  17: [0, 1450, 100, 100],
  18: [0, 1550, 100, 100],
  19: [0, 1650, 100, 100],
  20: [0, 1750, 100, 50],
  21: [0, 1850, 100, 50],
  22: [0, 1950, 100, 50]

}
var decorationShapes = {
  1: [0, 0, 100, 100]
}

var x=0;
var y=0;
var largeBlockSize = 20;
var smallBlockSize = 10;

var mountain = [
  {'block':4, pos:[x,y+130,largeBlockSize,largeBlockSize]},
  {'block':4, pos:[x+20,y+130,largeBlockSize,largeBlockSize]},
  {'block':4, pos:[x+40,y+130,largeBlockSize,largeBlockSize]},
  {'block':4, pos:[x+60,y+130,largeBlockSize,largeBlockSize]},
  {'block':13, pos:[x+80,y+130,largeBlockSize,largeBlockSize]},
  {'block':14, pos:[x+100,y+130,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+120,y+130,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+140,y+130,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+160,y+130,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+180,y+130,largeBlockSize,largeBlockSize]},
  {'block':15, pos:[x+200,y+130,largeBlockSize,largeBlockSize]},
  {'block':15, pos:[x+220,y+130,largeBlockSize,largeBlockSize]},
  {'block':15, pos:[x+240,y+130,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+260,y+130,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+280,y+130,largeBlockSize,largeBlockSize]},

  {'block':3, pos:[x+120,y+110,largeBlockSize,largeBlockSize]},
  {'block':4, pos:[x+140,y+110,largeBlockSize,largeBlockSize]},
  {'block':4, pos:[x+160,y+110,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+180,y+110,largeBlockSize,largeBlockSize]},
  {'block':18, pos:[x+200,y+110,largeBlockSize,largeBlockSize]},
  {'block':12, pos:[x+220,y+110,largeBlockSize,largeBlockSize]},
  {'block':17, pos:[x+240,y+110,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+260,y+110,largeBlockSize,largeBlockSize]},
  {'block':2, pos:[x+280,y+110,largeBlockSize,largeBlockSize]},

  {'block':5, pos:[x+180,y+90,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+200,y+90,largeBlockSize,largeBlockSize]},
  {'block':20, pos:[x+220,y+90,largeBlockSize,largeBlockSize]},
  {'block':21, pos:[x+240,y+90,largeBlockSize,largeBlockSize]},
  {'block':6, pos:[x+260,y+90,largeBlockSize,largeBlockSize]},

  {'block':7, pos:[x+200,y+70,largeBlockSize,largeBlockSize]},
  {'block':1, pos:[x+220,y+70,largeBlockSize,largeBlockSize]},
  {'block':8, pos:[x+240,y+70,largeBlockSize,largeBlockSize]},

  {'block':9, pos:[x+200,60,largeBlockSize,smallBlockSize]},
  {'block':11, pos:[x+220,60,largeBlockSize,smallBlockSize]},
  {'block':10, pos:[x+240,60,largeBlockSize,smallBlockSize]}
]
var backgroundXLoc = 0;
var canvasXLoc = 0;

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
    $(sounds.backgroundMusic).on('loadeddata', loadComplete);
    sounds.backgroundMusic.load();

    sounds.gameOver = new Audio("audio/76376__deleted-user-877451__game-over.wav");
    $(sounds.gameOver).on('loadeddata', loadComplete);
    sounds.gameOver.load();

    sounds.landingonPlatform = new Audio("audio/86005__nextmaking__landing-on-the-ground.aif");
    $(sounds.landingonPlatform).on('loadeddata', loadComplete);
    sounds.landingonPlatform.load();

    sounds.attack = new Audio("audio/216200__rsilveira-88__cartoon-punch-04.wav");
    $(sounds.attack).on('loadeddata', loadComplete);
    sounds.attack.load();

    sounds.levelUp = new Audio("audio/320657__rhodesmas__level-up-03.wav");
    $(sounds.levelUp).on('loadeddata', loadComplete);
    sounds.levelUp.load();
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
    return (loadedItems == 7);
}
// start the game
function gameStart() {
    if (!isEveryingLoaded)
        return;
    $('#playfield').css('background-position', '0px 0');
    gameStarted = true;
    drawPlatforms();
    $('#gameStart').hide();
    $('#gameOver').hide();
    sounds.backgroundMusic.play();
    sounds.gameOver.currentTime = 0; // rewind the 'game over' sound
    startTimer();
    // moveBackground();
}

var backgroundTimer;
function moveBackground() {
  var x = 0;
  setInterval(function(){
      x-=1;
      if (x>=-898){
        $('#playfield').css('background-position', x + 'px 0');
      } else {
        haltBackground();
      }
  }, 5);
}
function haltBackground() {
    clearInterval(backgroundTimer);
}

// end the game
function gameEnd() {
    sounds.backgroundMusic.pause();
    sounds.gameOver.play();
    gameStarted = false;
    moveBackground();
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

function drawPlatforms() {
  for (idx=0;idx<mountain.length;idx++){
    var blockCoords = groundShapes[mountain[idx].block];
    var blockPos = mountain[idx].pos;
    context.drawImage(images.groundImage,
      blockCoords[0],blockCoords[1],blockCoords[2],blockCoords[3],
      blockPos[0],blockPos[1],blockPos[2],blockPos[3]);
  }
}
