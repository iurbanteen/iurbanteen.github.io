var characterImage;
var direction;
var moving = false;
var interval;
var currXLoc = 0;
var canvas;
var context;
var stepPauseInMillis = 100;
var stepArray = [
  {x : 148, y : 4, width: 46, height: 93},
  {x : 212, y : 2, width: 46, height: 95},
  {x : 271, y : 2, width: 58, height: 92},
  {x : 335, y : 3, width: 58, height: 92},
  {x : 148, y : 102, width: 47, height: 91},
  {x : 208, y : 102, width: 55, height: 92},
  {x : 268, y : 99, width: 60, height: 87},
  {x : 335, y : 100, width: 54, height: 94},
  {x : 148, y : 4, width: 46, height: 93}
];
var standing =  {x : 5, y : 2, width: 52, height: 96};
var currentIndex = 0;


var boxSize = 30;
var xOffset = 360;
var yOffset = 500;
var boingSound;



$(function(){
  console.log(`Initialization`);
  characterImage = new Image();
  characterImage.src = "Mario.png";
  characterImage.onload = imageLoaded;
  direction = "right";
  canvas = $('#playfield').get(0);
  context = canvas.getContext('2d');
  document.onkeydown = keyEventHandler;
  boingSound = new Audio("boing.wav");
})


function keyEventHandler(event){
  switch(event.keyCode){
    case 38: // up
      boingSound.play();
      break;
    case 39: // right key
      move();
      break;
    case 37: // left key
    case 32: // spacebar
      halt();
      break;
  }
}

function imageLoaded(){
  console.log("Image loaded now");
  drawAt(standing);
}



function drawAt( characterIndex ){
    clear();
      context.drawImage( characterImage,characterIndex.x,characterIndex.y,characterIndex.width,characterIndex.height,
        xOffset,yOffset,characterIndex.width,characterIndex.height);
    console.log("Drawing");
}
function clear(){
  context.clearRect(0, 0, playfield.width, playfield.height);
}
function halt(){
  if(moving) stop();
}
function move() {
  if (!moving){
    start();
  }
}

function stop() {
    clearInterval(interval);
    interval = "";
    moving = false;
    clearInterval(interval2);
    drawAt(standing);
}

function start() {
    moving = true;
    interval = setInterval(function() {
        (direction == "right") ? currXLoc -= 1: currXLoc += 1;
        $('#playfield').css('background-position', currXLoc + 'px 0');
    }, 10);
    animateDude();
}

var interval2;
function animateDude(){
    var step = 0;
    interval2 = setInterval(function() {
      drawAt(stepArray[step++ % 8]);
    },stepPauseInMillis);
}
