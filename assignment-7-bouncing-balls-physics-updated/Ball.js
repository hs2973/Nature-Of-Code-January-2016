//constructor function for creating ball
var Ball = function(x,y,r) {
  // this.xpos = x;
  // this.ypos = y;
  this.pos = createVector(x,y);
  
  this.r = r;
  
  var density = 0.1;
  this.mass = density * 4/3*PI*this.r^3; // proportional to
  
  // this.vx = random(-2,2);
  // this.vy = 2;
  this.vel = createVector(0.001,0);
  this.acc = createVector(0,0);
  
  this.rr = random(255);
  this.gg = random(255);
  this.bb = random(255);
  
  this.totalVelChange = createVector(0,0);
};

Ball.prototype.show = function(){
  noFill();
  stroke(this.rr,this.gg,this.bb);
  ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
};

Ball.prototype.update = function(){
  // this.totalVelChange is calculated from collision
  if(!this.totalVelChange){
    this.vel.mult(0);
    this.vel.add(this.totalVelChange);
  }
  
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  
  // resetting the acceleration to 0 in each frame
  this.acc.mult(0);
};

Ball.prototype.applyForce = function(force){
  this.acc.add(force.div(this.mass));
};

Ball.prototype.checkBounce = function(){
  // bouncing off the ground
  if(this.pos.y + this.r >= canvasHeight || this.pos.y - this.r <= 0)
  {
    this.vel.y *= -1;
  }
  
  // bouncing off the wall
  if(this.pos.x + this.r >= canvasWidth || this.pos.x - this.r <= 0)
  {
    this.vel.x *= -1;
  }
};

Ball.prototype.checkCollision = function(){
  this.totalVelChange.mult(0);
  
  for(var i = 0; i < balls.length; i++){
    var other = balls[i];
    
    // avoiding checking self
    if(this == other){
      continue;
    }
    
    // check collision with
    if(this.collidesWith(other)){
      
      // change velocities - physics momentum stuffs
      var changeX = (this.vel.x * (this.mass-other.mass) + (2*other.mass*other.vel.x)) / (this.mass+other.mass);
      var changeY = (this.vel.y * (this.mass-other.mass) + (2*other.mass*other.vel.y)) / (this.mass+other.mass);
    
      this.totalVelChange.add(changeX,changeY);
    }
  }
};

// returns boolean value
Ball.prototype.collidesWith = function(other){
  if(this.r + other.r >= dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y))
  {
    return true; 
  }
  else{
    return false;
  }
};


