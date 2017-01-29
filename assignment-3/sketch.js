var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var pendulums = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
  
  for(var i=1; i<=20; i++){
    pendulums.push(new Pendulum(50+i*10))
  }
}

function draw() {
  background(175);
  
  pendulums.forEach(function(pendulum){
    pendulum.show();
    pendulum.update();
  });
}

function Pendulum(length){
  var bobRadius = 10;
  var centreX = canvasWidth/2;
  var centreY = 150;
  
  this.length = length;
  this.theta = 225;
  
  
  this.x = centreX + this.length*sin(this.theta-270);
  this.y = centreY + this.length*cos(this.theta-270);
  
  print(this.y);
  
  
  // var thetaMax = 45;
  
  // // acceleration due to gravity
  // var g = 9.81;
  
  // var vmax = Math.sqrt(2*g*(this.length-cos(thetaMax)*this.length));
  
  // var vx = vmax * cos(thetaMax);
  // var vy = vmax * sin(thetaMax);

  this.show = function(){
    noFill();
    stroke(0);
    line(centreX,0,this.x,this.y);
    
    fill(255);
    stroke(0);
    ellipse(this.x,this.y,bobRadius*2,bobRadius*2);
  }
  
  this.update = function(){
    this.theta += 1;
    //this.x = centreX + this.length*sin(this.theta-270);
    //this.y = centreY + this.length*cos(this.theta-270);
    
    this.x = map(sin(this.theta-270),-1,1,canvasWidth/2-200,canvasWidth/2+200);
    this.y = map(abs(sin(this.theta-180)),0,1,50-30,50+30);
    
  }
}