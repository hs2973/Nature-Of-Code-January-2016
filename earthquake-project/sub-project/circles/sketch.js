var circle1;

var status = "pause";

var Circle = function(x,y,radius){
  // centre of the circle
  this.pos = createVector(x,y);
  
  // radius of the circle
  this.r = radius;

  this.rr = 180;
  this.gg = 60;
  this.bb = 60;
  
  // opacity
  this.aa = 200; // 255 is opaque

  // the amount with which radius is increased
  this.rate = 0.2;
}

Circle.prototype.update = function(){
  this.r += this.rate;
}

Circle.prototype.display = function(){
  fill(this.rr, this.gg, this.bb, this.aa);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  circle1 = new Circle(window.innerWidth/2, window.innerHeight/2,0);
}

function draw() {
  background(255);
  fill(180,60,60);
  text("Click to play the simulation", 50,50);
  
  if(status == "play"){
    circle1.update();
    circle1.display();
  }
  
  if (circle1.r >= 100){
    status = "pause";
  }
}

function mousePressed(){
  status = "play";
  circle1.r = 0;
}
