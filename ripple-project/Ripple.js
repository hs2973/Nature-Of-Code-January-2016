var Circle = function(x,y,radius){
  this.pos = createVector(x,y);
  
  this.r = radius;

  this.rr = 180;
  this.gg = 60;
  this.bb = 60;
  
  // opacity
  this.aa = 200; // 255 is opaque
  
  // fill(this.rr,this.gg,this.bb, this.aa);
  // ellipse(0,0,50,50);
  
  // the amount with which radius is increased
  this.rate = 0.2;
}

Circle.prototype.update = function(){
  this.r += this.rate;
}

Circle.prototype.display = function(){
  fill(this.rr, this.gg, this.bb, this.aa);
  noStroke();
  // stroke(255,0,0);
  ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
}

var Ripple= function(x,y,radius){
  this.pos = createVector(x,y);
  this.r = radius;
  
  // number of circles
  // this.n = 10;
  this.circles = [];
  
  this.separation = 15;
  
  this.circles.push(new Circle(this.pos.x, this.pos.y, 0));

  this.endRipple = false;
}

Ripple.prototype.update = function(){
  
  for(var i=0; i<this.circles.length; i++){
    var circle = this.circles[i];
    if(circle.r > this.r*1.5){
      // this.removeCircle(i);
      this.endRipple = true;
    }else{
      circle.update();
      
      circle.aa -= (255/this.r)*circle.rate;
    }
  }
  
  if(this.circles[this.circles.length-1].r >= this.separation && !this.endRipple){
    this.circles.push(new Circle(this.pos.x, this.pos.y, 0));
  }
}

Ripple.prototype.removeCircle = function(index){
  this.circles.splice(index,1);
}

Ripple.prototype.display = function(){
  this.circles.forEach(function(circle){
    circle.display();
  });
}