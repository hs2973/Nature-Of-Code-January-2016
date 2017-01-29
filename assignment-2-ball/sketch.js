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
  });
}

function mouseClicked(){
  // check where the mouse is clicked
  var ballClicked = false;
  
  if(!ballClicked){
    balls.push(new Ball(mouseX,mouseY,random(20,40)));
  }
}

/*print("Mass");
print(self.mass);
print(ball.mass);

print("Initial Velocity");
print(self.vx);
print(self.vy);
print(ball.vx);
print(ball.vy);

print("Final Velocity");
print(newVelX1);
print(newVelY1);
print(newVelX2);
print(newVelY2);

noLoop();*/

