var world;

var balls = [];
var boundaries = [];

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  
  world = createWorld();
  var thickness = 0;
  
  // Boundary x and y should be centered
  boundaries.push(new Boundary(width/2,height-thickness/2,width,thickness));
  boundaries.push(new Boundary(width/2,thickness/2,width,thickness));
  boundaries.push(new Boundary(thickness/2,height/2,thickness,height));
  boundaries.push(new Boundary(width-thickness/2,height/2,thickness,height));
}

function draw() {
  background(255);
  
  fill(0);
  noStroke();
  textSize(24);
  text("Click anywhere on the screen",50,50);
  
  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  boundaries.forEach(function(boundary){
    boundary.show();
  });
  
  balls.forEach(function(ball){
    ball.show();
  });
}

function mouseClicked(){
  balls.push(new Ball(mouseX,mouseY,random(20,40)));
}


