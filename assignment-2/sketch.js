var branches = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(175);
  angleMode(DEGREES);
  
  Branch(window.innerWidth/2,window.innerHeight/2,50);
}

function draw() {
  background(175);
  println("background refreshed");
  branches.forEach(function(branch){
    branch.endPoints.forEach(function(endPoint){
      println(branch.x + " " + branch.y + " " + endPoint[0] + " " + endPoint[1]);
      line(branch.x,branch.y,endPoint[0],endPoint[1]);
    });
  });
}

function Branch(x,y,length) {
  this.x = x;
  this.y = y;
  
  this.n = 2;
  
  this.endPoints = [];
  
  for (i=1; i<=this.n; i++) {
    var theta = random(0,180);
    
    var a = x+length * cos(theta);
    var b = y+length * sin(theta);
    
    this.endPoints.push([a,b]);
    
    if(length*0.75 > 2){
      Branch(a,b,length*0.75);
    }
    //createBranch(a,b,length*0.75);
  }
  
  branches.push(this);
}