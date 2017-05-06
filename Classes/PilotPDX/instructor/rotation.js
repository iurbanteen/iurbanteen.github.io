
var playfield;
var context;
var x = 400, y = 300;
var r = 45;

$(function() {
    // initialize anything here
    playfield = document.getElementById('playfield');
    context = playfield.getContext("2d");
    // initialization routine(s)

    context.translate(x,y);
    context.rotate(r);
    // render the tank
    context.fillRect(-20,-10,40,20); // rotated about center
    console.log("Initialized");

    var tankInvMatrix = context.getTransform().invertSelf();
    var bx = 100, by = 100;
    var bullet = new DOMPoint(bx,by);
    var relBullet = tankInvMatrix.transformPoint(bullet);
    if(relBullet.x > -20 && relBullet.x < 20 && relBullet.x > -10 && relBullet.x < 10){
      /// bullet has hit the tank
    } else {

    }

});

var gameInterval;
function start(){
  gameInterval = setInterval(function() {
    //$('#playfield').css('background-position', --backgroundXLoc + 'px 0');
  }, 1);
}

function checkBullet(){

}

function end(){
  clearInterval(gameInterval);
}
