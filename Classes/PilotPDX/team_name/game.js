var currentScore;
var livesRemaining;
var gameLengthSeconds = 30;
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
    duck.initialize();
    duck.draw();

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
  $(sounds.gameOver).on('loadeddata', loadComplete);
  sounds.gameOver.load();

  sounds.bossDamage = new Audio("audio/bossdamage.wav")
  $(sounds.bossDamage).on('loadeddata', loadComplete);
  sounds.bossDamage.load();

  sounds.flapping = new Audio("audio/flap1.wav")
  $(sounds.flapping).on('loadeddata', loadComplete);
  sounds.flapping.load();
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
    duck.draw();
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
var duck = {
  x: 325,
  y: 397,
  width: 150,
  height: 150,
  hit: false,
  speed: 1,
  direction: 0,
  moving: false,
  hit: false,
  bulletLimit: 5,
  bullets: [],
  img: null,
  draw(){
    context.clearRect(this.x-2, this.y-2, this.width+4, this.height+4);
    // Determine if the action is move action
		if (KEY_STATUS.left || KEY_STATUS.right) {
			if (KEY_STATUS.left) {
				this.x -= this.speed
				if (this.x <= 0) // Keep player within the screen
					this.x = 0;
			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			}
    }
    context.drawImage(this.img,this.x ,this.y);
    // fire!!!
    if (KEY_STATUS.space) {
      this.fire();
    }
    //context.fillRect(this.);
    // reset current transformation matrix to the identity matrix
    context.setTransform(1, 0, 0, 1, 0, 0);
    this.drawBullets();
  },
  initialize(){
    this.x = Math.round( (playfield.width + this.width) / 2);
    this.img = new Image();
    this.img.onload = this.loaded;
    this.img.src = "images/rubberDucky.jpg";
  },
  loaded(){
    console.log('loaded!');
  },
  fire(){
    if(this.bullets.length < this.bulletLimit){
      this.bullets.push({x:this.x, y: this.y});
    }
  },
  drawBullets(){
    // remove offscreen bullets
    for(var i = this.bullets.length; i--; ){
      if (this.bullets[i].y < 0) this.bullets.splice(i, 1);
    }
    for(var i = this.bullets.length; i--; ){
      //console.log(`bullet at ${i} : ${}`)
      this.drawBullet(this.bullets[i]);
    }
  },
  drawBullet(bullet){
    bullet.y -= 5;
    context.beginPath();
    context.moveTo(bullet.x, bullet.y);
    context.lineTo(bullet.x, bullet.y - 5);
    context.lineWidth = 4;
    context.strokeStyle = 'darkred';
    context.stroke();
    context.closePath();
  }
}
// register the key press listener
function initializeListeners() {
    document.onkeydown = keyDownEventHandler;
    document.onkeyup = keyUpEventHandler;
    // will need to add 'key up' for continual movement
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
