// Initialize Global variables.
var xOffset;
var yOffset;
var playfield;
var context;
var stepSize = 10;
var boxSize = 60;
var boxColor = "black";
var foodAmount = 0;
var food = [];
var foodSize = 72;
var foodImage;
var characterImage;
var gameLength = 3000;
var counter;
var currentScore = 0;
var started = false;


// Initialize --- when is this function called?
function init(){
  // Assign values to global convenience variables
  playfield = document.getElementById('theCanvas');
  context = playfield.getContext("2d");

  /// initialize food
  foodImage = new Image();
  foodImage.src = 'boisterousbikebheel.png';
  makeFood();

  characterImage = new Image();
  characterImage.src = 'brashbluebikeboy.png';

  // Call secondary init functions
  initListeners();
  initValues();

  // set box location`
  resetBox();

  // draw playfield
  draw();
}

//////////////////////
// Week 5 - Arrays! //
//////////////////////


function makeFood(){
    for(var i=0; i < foodAmount; i++){
      var randomX = Math.floor(Math.random()*playfield.width);
      var randomY = Math.floor(Math.random()*playfield.height);
      console.log("Preparing Snack");
      food.push({x: randomX, y: randomY});
    }
}

function drawFood(){
  for(var i=0; i < food.length; i++){
    console.log("Drawing Dinner")
    var currentFood = food[i];
    console.log(`Draw at (${currentFood.x}, ${currentFood.y})`);
    context.drawImage(foodImage, currentFood.x, currentFood.y, foodSize, foodSize);
  }
}

function checkForFood() {
  for (var i = 0; i < food.length; i++) {
    console.log(`Check for dot at: (${foodX},${foodY})`);
    var foodX = food[i].x, foodY = food[i].y;

    if ( (foodX >= xOffset) && (foodX <= (xOffset + boxSize))
      && (foodY >= yOffset) && (foodY <= (yOffset + boxSize))) {
        food.splice(i,1);
       currentScore = currentScore += 89;
         $("#score").text(currentScore);
      }
  }
}

// jQuery tip:
// $("#timer") is equivalent to document.getElementById('timer')
function initValues(){
  counter = gameLength;
  currentScore = 0;
  $("#timer").text(counter);
  $("#score").text(currentScore);
}

function startGame(){
  if (!started){
    started = true;
  runTimer();
  }
}


function runTimer(){
  var interval = setInterval(function() {
    if (counter >0){
      tickClock();
      if (counter == 1) gameEndSound.play(); // play sound with 1 sec. remaining
    } else {
      clearInterval(interval);
      started = false;
    }
  },1000);
}

function tickClock(){
  counter -= 1;
  $("#timer").text(counter);
}


//////////////////////////
// Week 4 - Refactoring //
// If (else) statements //
//////////////////////////

// Listen for key press events
function initListeners(){
  document.onkeydown = keyEventHandler;
  //window.addEventListener('onkeydown', keyEventHandler, false);
}


// Translate even code into movement direction and move
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

///////////////////////////////
//        Week 3             //
// Interactive customization //
///////////////////////////////

// Changes number of steps box takes with each 'move'
function setStepSize(value){
  stepSize = parseInt(value);
  }


// Sets box color to color selected in 'boxColor' dropdown HTML element
function setColor(){
  var colorOption = document.getElementById('boxColor')
  boxColor = colorOption.options[colorOption.selectedIndex].value;
  draw();
}

///////////////////////////////
// Week 2 - Drawing the Game //
///////////////////////////////

// Draw current state of game.
function draw(){
  empty(); // clear canvas
  context.drawImage(characterImage, xOffset, yOffset, boxSize, boxSize);
  //context.fillStyle = boxColor; // change our paintbrush color
  //context.fillRect(xOffset,yOffset,boxSize,boxSize); // draw box
  drawFood();
}


// Clear canvas
function empty(){
  context.clearRect(0, 0, playfield.width, playfield.height);
}

// Move box to middle of canvas
function resetBox(){
  xOffset = playfield.width / 2;
  yOffset = playfield.height / 2;
}
