var Circle = function(x,y,radius){
  this.pos = createVector(x,y);
  
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

var Ripple= function(x,y,radius){
  // centre of the ripple
  this.pos = createVector(x,y);
  
  // max radius of the circle
  this.r = radius;
  
  // array of circles present in the particular ripple
  this.circles = [];
  
  // separation between two circles
  // it is tied to the radius of the ripple (bigger radius = bigger separation)
  // the number 20 and 140 is from the new Ripple() map function
  this.separation = map(radius, 20, 140, 6, 18);
  
  // add a first circle to the array
  this.circles.push(new Circle(this.pos.x, this.pos.y, 0));
  
  // flag variable to end the ripple effect
  this.endRipple = false;
}

Ripple.prototype.update = function(){
  for(var i=0; i<this.circles.length; i++){
    var circle = this.circles[i];
    if(circle.r > this.r*1.5){
      // remove the circle from the ripple
      this.removeCircle(i);
      
      // end the ripple
      this.endRipple = true;
    }else{
      circle.update();
      
      // decrease the opacity of the circle
      circle.aa -= (255/this.r)*circle.rate;
    }
  }
  
  if(this.circles.length >= 1){
    
    // create new circle if the previous circle's radius >= specified separation
    if(this.circles[this.circles.length-1].r >= this.separation && !this.endRipple){
      this.circles.push(new Circle(this.pos.x, this.pos.y, 0));
    }
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