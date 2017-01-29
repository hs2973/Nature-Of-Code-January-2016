var Earthquake = function(lat,lng,magnitude,place,time,last_updated,url){
  // (latitude, longitude) of the earthquake
  this.lat = lat;
  this.lng = lng;
  
  this.x = map(this.lng, -180, 180, 0, canvasWidth);
  this.y = map(this.lat, 90, -90, 0, canvasHeight);

  // magnitude of the earthquake
  this.mag = magnitude;
  
  // human-readabale description of the place
  this.place = place;
  
  this.time = time; // UNIX timestamp
  this.last_updated = last_updated;
  
  this.url = url; // link to USGS website
  
  this.ripple = new Ripple(this.x,this.y,map(this.mag,3,10,20,140));
};

Earthquake.prototype.display = function(){
  this.ripple.update();
  this.ripple.display();
};