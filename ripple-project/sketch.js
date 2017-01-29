var status = "pause";

var ripple;

// canvas dimensions
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(255);
  fill(180,60,60);
  text("Click to play the simulation", 50,50);
  
  if(status == "play"){
    ripple.update();
    ripple.display();
  }
}

function mousePressed(){
  ripple = new Ripple(canvasWidth/2, canvasHeight/2,map(6,3,10,40,140));
  status = "play";
}