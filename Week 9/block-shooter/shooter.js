var playfield;
var context;
var x = 400, y = 300;

var bounceHeight = 330;
var shipsOnScreen = 4;


$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("2d");
    // initialization routine(s)
    enemy.removeAndReplaceOffscreenShips();
    enemy.drawShips();
});


var timer;
var countdownSeconds = 10;
function startTimer(){
  gameLoop = setInterval(function() {
    countdownSeconds--;
    if (countdownSeconds == 0){
      stopTimer();
      gameEnd();
    }
  }, 1000);
}
function stopTimer(){
  clearInterval(timer);
}

var gameLoop;
var ticks = 0;
function gameStart(){
  startTimer();
  gameLoop = setInterval(function() {
    gameTick();
  }, 1);
}

function gameTick(){
  context.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  context.globalAlpha = 1; // reset alpha
  context.clearRect(0, 0, playfield.width, playfield.height);
  enemy.setOffscreenShips();
  enemy.removeAndReplaceOffscreenShips();
  enemy.drawShips();
  //if (++ticks > 1000) gameEnd();
}

function gameEnd(){
  clearInterval(gameLoop);
  //ticks = 0;
}

var enemy = {
  count : 4,
  shipWidth : 80,
  shipHeight : 40,
  spaceShips : [],
  drawShips(){
    this.iterate(spaceShip => spaceShip.draw());
  },
  checkOffscreen(){
    if (( ((this.x + this.width) < 0) ||
       (this.x > playfield.width) ||
       ((this.y + this.height) < 0) ) && this.returning){
         this.offscreen = true;
       }
  },
  drawShip(){
    if(this.offscreen){
      console.log("It's offscreen now");
    }
    context.clearRect(this.x-2, this.y-2, this.width+4, this.height+4);
    var xdx = Math.cos(this.direction);
    var xdy = Math.sin(this.direction);
    this.x += xdx * this.speed;
    this.y += xdy * this.speed;
    if (this.y >= bounceHeight){
      this.direction = -this.direction;
      this.returning = true;
    }

    if(this.testHit){
      // it's hit
      this.hit = true;
    }

    context.translate(this.x, this.y);

    context.beginPath();
    context.rect(0,0,this.width,this.height);
    //context.beginPath();
    //context.ellipse(0, 0, this.width, this.height, 0, 0, 2 * Math.PI);
    context.fillStyle = 'green';
    //context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
    context.closePath();
    //context.fillRect(this.);
    // reset current transformation matrix to the identity matrix
    context.setTransform(1, 0, 0, 1, 0, 0);
  },
  intersects(x,y,width,height){
    for (spaceShip of this.spaceShips){
      //console.log("SS : " , spaceShip);
      var isOverlap = !(spaceShip.x + spaceShip.width < x ||
           x + width < spaceShip.x ||
           spaceShip.y + spaceShip.height < y ||
           y + height < spaceShip.y);
       //console.log(`Is overlap? ${isOverlap}`);
     }
  },
  addShip(x,y){
    var direction = 60 * Math.PI / 180;
    if (x >= (playfield.width/2)){
      //console.log("swoop left");
      direction = 120 * Math.PI / 180; // 60 degrees
    }
    this.spaceShips.push({
            x,y,
            width : this.shipWidth,
            height : this.shipHeight,
            returning : false,
            hit : false,
            speed : 1,
            direction : direction,
            testHit : this.isHit,
            hit : false,
            draw : this.drawShip,
            offscreen : false,
            checkIfOffscreen : this.checkOffscreen
        });
  },
  isHit(x,y){

  },
  setOffscreenShips(){
    this.iterate(spaceShip => spaceShip.checkIfOffscreen());
  },
  iterate(callback){
    for (spaceShip of this.spaceShips){
      callback(spaceShip);
    }
  },
  initializeShips(numberOfShips){
    // create some random ships
    for(var i = 0; i < numberOfShips; i ++){
        var xLocation = Math.round(Math.random() * playfield.width);
        var yLocation = Math.round(Math.random() * 400) + this.shipHeight;
        this.addShip(xLocation, -yLocation); // random location, 10px from top
        //console.log(`Add ship at {${xLocation}, ${yLocation}}`);
    }
  },
  removeAndReplaceOffscreenShips(){
    this.removeOffscreenShips();
    this.initializeShips(this.count - this.spaceShips.length);
  },
  removeOffscreenShips(){
    //console.log(`Spaceship length = ${this.spaceShips.length}`);
    for(var i = this.spaceShips.length-1; i >= 0; i--){
    	if (this.spaceShips[i].offscreen === true) this.spaceShips.splice(i, 1);
      //console.log(`Removed at ${i}`);
    }
  }

}
