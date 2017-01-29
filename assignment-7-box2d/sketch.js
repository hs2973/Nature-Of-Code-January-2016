var world;

var balloons = [];
var boundaries = [];

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

// Perlin noise
var perlinNoise = {
  t : 0,
  scaleFactor : 100,
}

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  
  world = createWorld();
  var thickness = 1;
  
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
  
  var wind = new box2d.b2Vec2((noise(perlinNoise.t)-0.5)*perlinNoise.scaleFactor, (noise(perlinNoise.t+100)-0.5)*perlinNoise.scaleFactor);
  perlinNoise.t += 0.1;
  
  balloons.forEach(function(balloon){
    // var pos = scaleToPixels(balloon.body.GetPosition());
    // var factor = 1000;
    // var distance = dist(pos.x,pos.y,mouseX,mouseY);
    // var signX = (pos.x-mouseX)/abs(pos.x-mouseX);
    // var signY = (pos.y-mouseY)/abs(pos.y-mouseY);
    // var repulsion = new box2d.b2Vec2(signX*(1/distance)*factor,signY*(1/distance)*factor);
    // balloon.body.ApplyForce(repulsion, balloon.body.GetPosition());
    
    balloon.body.ApplyForce(wind, balloon.body.GetPosition());
    balloon.show();
  });
}

function mouseClicked(){
  balloons.push(new Balloon(mouseX,mouseY,random(20,40)));
}



