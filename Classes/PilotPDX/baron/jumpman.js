var xOffset;
var yOffset;
var playfield;
var context;
var stepSize = 10;
var boxSize = 100;
var boxColor = "";
var foodAmount = 300;
var food = [];
var foodSize = 30;
var foodImage = new Image();
foodImage.src = '';
var boxImage = new Image();
boxImage.src = '';
var gameLength = 30;
var counter;
var currentScore;
var started = false;

function keyEventHandler(event){
  if (event.keyCode == 38) {
    move('up');
  } else if (event.keyCode == 39) {
    move('right');
  } else if (event.keyCode == 40) {
    move('down');
  } else if (event.keyCode == 37) {
    move('left');
  }
}

function move(direction){
    if (direction == 'up' && yOffset > 0){
      yOffset -= stepSize;
    }
    else if (direction == 'down' && yOffset < (playfield.height - boxSize)){
      yOffset += stepSize;
    }
    else if (direction == 'right' && xOffset < (playfield.width - boxSize)){
      xOffset += stepSize;
    }
    else if (direction == 'left' && xOffset > 0){
      xOffset -= stepSize;
    }
  checkForFood();
  draw();
}
