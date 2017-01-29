var balls = [];

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(255);
  
  fill(0);
  noStroke();
  textSize(24);
  text("Click anywhere on the screen",50,50);
  
  balls.forEach(function(ball){
    ball.show();
    ball.update();

    ball.checkBounce();
    ball.checkCollision();
    
    var gravity = createVector(0,2);
    ball.applyForce(gravity);
  });
}

function mouseClicked(){
  // check where the mouse is clicked
  var ballClicked = false;
  
  if(!ballClicked){
    balls.push(new Ball(mouseX,mouseY,random(20,40)));
  }
}


