//constructor function for creating repeller
var Repeller = function(x,y,r) {
  this.r = r;
  this.w = r;
  this.h = r;
  
  // defining the body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y); // box2d helper library
  
  // defining the fixture
  var fd = new box2d.b2FixtureDef();
  
  // some properties of body's fixture
  fd.shape = new box2d.b2CircleShape();
  fd.shape.m_radius = scaleToWorld(this.r);

  fd.density = 0.1;
  fd.friction = 0.1;
  fd.restitution = 0.8; // bounciness

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);
  
  this.rr = random(255);
  this.gg = random(255);
  this.bb = random(255);
};

Balloon.prototype.show = function(){
  var pos = scaleToPixels(this.body.GetPosition());
  
  noFill();
  stroke(this.rr,this.gg,this.bb);
  // strokeWeight(2);
  ellipse(pos.x,pos.y,this.r*2,this.r*2);
};
