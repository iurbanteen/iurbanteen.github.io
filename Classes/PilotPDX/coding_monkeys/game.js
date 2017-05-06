var currentScore;
var livesRemaining;
var gameLengthSeconds = 10;
var timedCounter;
var gameStarted = false;
var playfield;
var context;
var mainCharacter;
var level1;
var backgroundXLoc = 0;
var canvasXLoc = 0;
var backgroundTimer;
var keyEvent;

var sounds = {
    backgroundMusic: null,
    gameOver: null
}

var dude = {
  image : null,
  standing : {x : 5, y : 2, width: 52, height: 96},
  runningRight : [
    {x : 148, y : 4, width: 46, height: 93},
    {x : 212, y : 2, width: 46, height: 95},
    {x : 271, y : 2, width: 58, height: 92},
    {x : 335, y : 3, width: 58, height: 92},
    {x : 148, y : 102, width: 47, height: 91},
    {x : 208, y : 102, width: 55, height: 92},
    {x : 268, y : 99, width: 60, height: 87},
    {x : 335, y : 100, width: 54, height: 94}
  ],
  runningLeft : [
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

var images = {
    groundImage: null,
    decorationImage: null
}
var groundImageMap = {
  1: {x:0, y:0, width:100, height:100},
  2: {x:0, y:100, width:100, height:100},
  3: {x:0, y:200, width:100, height:100},
  4: {x:0, y:300, width:100, height:100},
  5: {x:0, y:400, width:100, height:100},
  6: {x:0, y:500, width:100, height:100},
  7: {x:0, y:600, width:100, height:100},
  8: {x:0, y:700, width:100, height:100},
  9: {x:0, y:800, width:100, height:50},
  10: {x:0, y:850, width:100, height:50},
  11: {x:0, y:900, width:100, height:50},

  12: {x:0, y:950, width:100, height:100},
  13: {x:0, y:1050, width:100, height:100},
  14: {x:0, y:1150, width:100, height:100},
  15: {x:0, y:1250, width:100, height:100},
  16: {x:0, y:1350, width:100, height:100},
  17: {x:0, y:1450, width:100, height:100},
  18: {x:0, y:1550, width:100, height:100},
  19: {x:0, y:1650, width:100, height:100},
  20: {x:0, y:1750, width:100, height:50},
  21: {x:0, y:1850, width:100, height:50},
  22: {x:0, y:1950, width:100, height:50}

}

var decorationShapes = {
  1: {x:0, y:0, width:100, height:100}
}

var largeBlockSize = 20;
var smallBlockSize = 10;

var mountain = [
  {'block':4, pos:{x:0,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':4, pos:{x:20,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':4, pos:{x:40,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':4, pos:{x:60,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':13, pos:{x:80,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':14, pos:{x:100,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:120,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:140,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:160,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:180,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':15, pos:{x:200,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':15, pos:{x:220,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':15, pos:{x:240,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:260,y:130,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:280,y:130,width:largeBlockSize,height:largeBlockSize}},

  {'block':3, pos:{x:120,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':4, pos:{x:140,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':4, pos:{x:160,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:180,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':18, pos:{x:200,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':12, pos:{x:220,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':17, pos:{x:240,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:260,y:110,width:largeBlockSize,height:largeBlockSize}},
  {'block':2, pos:{x:280,y:110,width:largeBlockSize,height:largeBlockSize}},

  {'block':5, pos:{x:180,y:90,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:200,y:90,width:largeBlockSize,height:largeBlockSize}},
  {'block':20, pos:{x:220,y:90,width:largeBlockSize,height:largeBlockSize}},
  {'block':21, pos:{x:240,y:90,width:largeBlockSize,height:largeBlockSize}},
  {'block':6, pos:{x:260,y:90,width:largeBlockSize,height:largeBlockSize}},

  {'block':7, pos:{x:200,y:70,width:largeBlockSize,height:largeBlockSize}},
  {'block':1, pos:{x:220,y:70,width:largeBlockSize,height:largeBlockSize}},
  {'block':8, pos:{x:240,y:70,width:largeBlockSize,height:largeBlockSize}},

  {'block':9, pos:{x:200,y:60,width:largeBlockSize,height:smallBlockSize}},
  {'block':11, pos:{x:220,y:60,width:largeBlockSize,height:smallBlockSize}},
  {'block':10, pos:{x:240,y:60,width:largeBlockSize,height:smallBlockSize}}
]

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

  level1 = new GamePlatform1();
  level1.init(0,0,playfield, context);

  dude.image = new Image();
  dude.image.onload = loadedImage;
  mainCharacter = new GameCharacter();
  mainCharacter.init(20, 0, dude, playfield, context);
  dude.image.src = "images/Mario.png";

}

var loadedItems = 0;
function loadComplete() {
    loadedItems += 1;
}

function loadedImage(){

  level1.draw();

  console.log("Loaded image");
  mainCharacter.draw();
  loadComplete();
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
    mainCharacter.init(20, 0, dude, playfield, context);
    mainCharacter.draw();
    level1.init(0,0,playfield, context);
    level1.draw();
    // drawPlatforms();
    $('#gameStart').hide();
    $('#gameOver').hide();
    sounds.backgroundMusic.play();
    sounds.gameOver.currentTime = 0; // rewind the 'game over' sound
    startTimer();
    requestAnimationFrame(mainLoop);
    // moveBackground();
}

function mainLoop() {
    update();
    draw();
    if (gameStarted){
      requestAnimationFrame(mainLoop);
    }
}

function update(){
  mainCharacter.update();
  level1.update();
  level1.collide(mainCharacter);
}

function draw(){
  level1.draw();
  mainCharacter.draw();
}

function moveBackground() {
  var x = 0;
  setInterval(function(){
      x-=1;
      if (x>=-898){
        $('#playfield').css('background-position', x + 'px 0');
        level1.remove(x);
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
    gameStarted = false;
    sounds.backgroundMusic.pause();
    sounds.gameOver.play();
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
    }, 5000);
}

// Translate key press event into direction
function keyEventHandler(event) {
    if (event.keyCode == 38) {
      event.preventDefault();
      // if (mainCharacter.moving && !mainCharacter.jumping){
        mainCharacter.jumping=true;
        mainCharacter.speed(0);
        // mainCharacter.jump();
      // }
    } else if (event.keyCode == 39) {
        mainCharacter.speed(5);
    } else if (event.keyCode == 40) {
        move('down');
    } else if (event.keyCode == 37) {
        mainCharacter.speed(-5);
    } else if (event.keyCode == 32) {
        // spacebar event - used for game start or jump ?
    }
}

function move(direction) {
    console.log(`Move ${direction}`);
    // add the motion handling
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
    this.jumpArc = [25,50,75,100];
    this.collideRight = false;
    this.collideLeft = false;
    this.yFall = this.speedY = 1;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
	}

  this.bounds = function(){
    return {x:this.x, y:this.y - this.height, width:this.currentPose.width/3, height:this.currentPose.height/3};
  }

  this.center = function(){
    return {x:this.x+((this.currentPose.width/3)/2), y:this.y+((this.currentPose.height/3)/2)};
  }

  this.update = function(){
    this.collideLeft = false;
    this.collideRight = false;
    // this.context.clearRect(this.x,this.y - this.height,this.currentPose.width,this.currentPose.height );
    // this.gravitySpeed += this.gravity;
    this.context.clearRect(this.x,this.y - this.height,this.currentPose.width,this.currentPose.height );
    this.y += this.speedY + this.gravitySpeed;
    this.speedY = this.yFall;
  }

  var blockLeft;

  this.collideRow = function(displayBlock, distanceBetweenCenters){
    console.log('bump');
    var blockCenter = displayBlock.center();
    var characterCenter = this.center;

    if (distanceBetweenCenters>0){
      this.collideLeft = true;
    }

    if (distanceBetweenCenters<0){
      this.collideRight = true;
    }

  }

  this.collideColumn = function(displayBlock, distanceBetweenCenters){
    this.speedY = 0;
  }

  this.draw = function(){
    this.context.drawImage(this.character.image, this.currentPose.x, this.currentPose.y,
      this.currentPose.width, this.currentPose.height,
      this.x, this.y - this.height, this.currentPose.width/3, this.currentPose.height/3);
  }

  this.speed = function(speed){
    this.moving = true;
    this.context.clearRect(this.x,this.y - this.height,this.currentPose.width,this.currentPose.height );
    if (speed<0 && this.x>=0 && !this.collideLeft){
      this.x += speed;
      this.currentPose = this.character.runningRight[this.moveIndex % (this.character.runningRight.length)];
    } else if (speed>0 && (this.x+this.currentPose.width)<=this.canvas.width  && !this.collideRight) {
      this.x += speed;
      this.currentPose = this.character.runningRight[this.moveIndex % (this.character.runningRight.length)];
    } else if (this.jumping){
      this.x += speed;
      this.jumpIndex++;
      this.currentPose = this.character.jumping;
      if (this.jumpIndex < this.jumpArc.length){
        this.speedY = this.yFall;
        this.y -= this.jumpArc[this.jumpIndex];
      } else {
        // this.speedY = 0;
        this.jumping = false;
        this.jumpIndex = -1;
      }
    } else {
      speed=0;
      speedY=0;
      this.currentPose = this.character.standing;
    }
    this.moveIndex++;
  }

}

function GamePlatform1() {
	this.init = function(x, y, canvas, context) {
    // Default variables
    this.x = x;
    this.y = y;
    this.height = 0;
    // this.character = character;
    this.context = context;
    this.canvas = canvas;
    this.moving = false;
    this.blockArray = [];
    for (idx=0;idx<mountain.length;idx++){
      var imgMapCoords = groundImageMap[mountain[idx].block];
      var blockPos = mountain[idx].pos;
      var blockObj = new GameBlock();
      blockObj.init(imgMapCoords.x,imgMapCoords.y,imgMapCoords.width,imgMapCoords.height,
        blockPos.x,blockPos.y,blockPos.width,blockPos.height,
        canvas, context);
      this.blockArray.push(blockObj)
    }
  }

  this.collide = function(character){
    for (i = 0; i < this.blockArray.length; i++) {
      var gameBlock = this.blockArray[i];
      var yRow = gameBlock.y+gameBlock.height;
      var characterRow = character.bounds().y+character.bounds().height;
      if (characterRow<=yRow && characterRow>gameBlock.y){
        gameBlock.collideRow(character);
      } else if (character.center().x>=gameBlock.x && character.x<(gameBlock.x+gameBlock.width)) {
        gameBlock.collideColumn(character);
      }
    }
  }

  this.update = function(){

  }

  this.draw = function(){
    for (i = 0; i < this.blockArray.length; i++) {
      var gameBlock = this.blockArray[i];
      gameBlock.draw();
    }
  }

  this.remove = function(xPos){
    this.moving = true;
    for (i = 0; i < this.blockArray.length; i++) {
      var gameBlock = this.blockArray[i];
      gameBlock.move(xPos);
    }
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
}

function GameBlock() {
	this.init = function(imgMapX, imgMapY, imgMapWidth, imgMapHeight, x, y, width, height, canvas, context) {
    // Default variables
    this.imgMapX = imgMapX;
    this.imgMapY = imgMapY
    this.imgMapWidth = imgMapWidth;
    this.imgMapHeight = imgMapHeight;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.canvas = canvas;
    this.sameRow = false;
  }

  this.center = function(){
    return {x:this.x+(this.width/2) , y:this.y+(this.height/2)};
  }

  this.collideRow = function(object){
    var objBounds = object.bounds();
    var objCenter = object.center();
    var distanceBetweenCenters = objCenter.x - this.center().x ;
    if (Math.abs(distanceBetweenCenters)<( (objBounds.width/2)+(this.width/2) ) ) {
      object.collideRow(this, distanceBetweenCenters);
    }
  }

  this.collideColumn = function(mario){
    var marioBounds = mario.bounds();
    var marioCenter = mario.center();
    var distanceBetweenCenters = this.center().y - marioCenter.y;
    // if (Math.abs(distanceBetweenCenters)<( (marioBounds.height/2)+(this.height/2) ) ) {
    //   mario.collideColumn(this, distanceBetweenCenters);
    // }
    if ( (marioBounds.y + marioBounds.height) >= this.y - 1 ) {
      mario.collideColumn(this, distanceBetweenCenters);
    }
  }

  this.draw = function(){
    this.context.drawImage(images.groundImage,
      this.imgMapX,
      this.imgMapY,
      this.imgMapWidth,
      this.imgMapHeight,
      this.x,
      this.y,
      this.width,
      this.height);
  }

  this.move = function(xPos){
    this.context.clearRect(this.x,this.y,this.width,this.height );
    this.x=xPos;
    this.draw();
  }
}
