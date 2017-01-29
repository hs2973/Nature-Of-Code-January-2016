var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var circles = [];

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  angleMode(DEGREES);
  
  circles.push(new CircleBoundary(canvasWidth/2,canvasHeight/2,200,20,[255,0,0],1));  
  circles.push(new CircleBoundary(canvasWidth/2,canvasHeight/2,200+40,20,[255,255,0],-1));
  //circles.push(new CircleBoundary(canvasWidth/2,canvasHeight/2,200-40,20,[0,255,0],-1));
}

function draw() {
  background(175);
  
  circles.forEach(function(circle){
    circle.display();
    
    if(!mouseIsPressed){
      circle.rotate(1);
    }
  })
}

var CircleBoundary = function(x,y,r,n,color,direction){
  // centre of the circle
  this.x = x;
  this.y = y;
  
  // radius
  this.r = r;
  
  // number of points in the circle's circumference
  this.n = n;
  
  // angle of separation between two points in the circle.
  var theta = 360/this.n;
  
  this.direction = direction;
  
  // angle with which the inner circle is rotated
  this.rotateTheta = 0;
  
  // color of the strings and the circles;
  this.color = color;
  
  var outerCircle = [];
  var outerCircleR = this.r*3;
  
  for(var i=0; i<this.n; i++){
    var x = this.x + outerCircleR * cos(i*theta);
    var y = this.y + outerCircleR * sin(i*theta);
    
    outerCircle.push([x,y]);
  }

  this.display = function(){
    var self = this;
    
    // draw points
    for(var i=0; i<self.n; i++){
      var x = self.x + self.r * cos(i*theta+self.rotateTheta);
      var y = self.y + self.r * sin(i*theta+self.rotateTheta);
      
      fill(self.color[0],self.color[1],self.color[2]);
      noStroke();
      ellipse(x,y,10,10);
      
      stroke(self.color[0],self.color[1],self.color[2]);
      fill(self.color[0],self.color[1],self.color[2]);
      
      var j = (self.n+i-7)%self.n;
      line(x,y,outerCircle[j][0],outerCircle[j][1]);
    }
  };
  
  this.rotate = function(theta){
    if(this.direction == 1){
      this.rotateTheta += theta;
    }else{
      this.rotateTheta -= theta;
    }
  };
};
