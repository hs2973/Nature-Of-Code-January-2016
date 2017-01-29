var t = 0;

//constructor function for creating ball
var Ball = function(x,y,r) {
  this.xpos = x;
  this.ypos = y;
  this.r = r;
  
  var density = 0.1; // 
  this.mass = density * 4/3*PI*this.r^3; // proportional to
  this.collidesWith = [];
  
  this.vx = random(-2,2);
  this.vy = 2;
  
  this.rr = random(255);
  this.gg = random(255);
  this.bb = random(255);
  
  this.show = function(){
    noFill();
    stroke(this.rr,this.gg,this.bb);
    ellipse(this.xpos,this.ypos,this.r*2,this.r*2);
  };
};

Ball.prototype.update = function(){
  if(this.ypos + this.r >= canvasHeight){
    if(this.vy > 0){
      this.vy = -0.99*this.vy;
    }
  }else{
    this.vy += 0.3;
  }
  
  if(this.ypos - this.r <= 0){
    if(this.vy < 0){
      this.vy = -0.99*this.vy;
    }
  }
  
  if(this.xpos + this.r >= canvasWidth){
    if(this.vx > 0){
      this.vx = -0.99 * this.vx;
    }
  }
  
  if(this.xpos - this.r <= 0){
    if(this.vx < 0){
      this.vx = -0.99 * this.vx;
    }
  }
  
  this.xpos += this.vx + map(noise(t),0,1,0,2);
  this.ypos += this.vy;
  
  t += 0.01;
  
  // check collision
  var isCollision = false;
  this.collidesWith = [];
  
  var self = this;
  
  balls.forEach(function(ball){
    // exclude the same ball
    if(ball != self){
      var distance = Math.sqrt(Math.pow(self.xpos-ball.xpos,2) + Math.pow(self.ypos-ball.ypos,2));

      if(self.r+ball.r >= distance){
        // collision is true
        isCollision= true;
        self.collidesWith.push(ball);
        
        var current = self;
        var collidedBefore = false;
        ball.collidesWith.some(function(ball){
          if(current == ball){
            collidedBefore = true;
          }
        });
        
        if(!collidedBefore){
          // physics momentum stuff
          var newVelX1 = (self.vx * (self.mass-ball.mass) + (2*ball.mass*ball.vx)) / (self.mass+ball.mass);
          var newVelY1 = (self.vy * (self.mass-ball.mass) + (2*ball.mass*ball.vy)) / (self.mass+ball.mass);
          var newVelX2 = (ball.vx * (ball.mass-self.mass) + (2*self.mass*self.vx)) / (self.mass+ball.mass);
          var newVelY2 = (ball.vy * (ball.mass-self.mass) + (2*self.mass*self.vy)) / (self.mass+ball.mass);

          self.vx = newVelX1;
          self.vy = newVelY1;
          ball.vx = newVelX2;
          ball.vx = newVelY2;
        }
      }
    }
  });
};
