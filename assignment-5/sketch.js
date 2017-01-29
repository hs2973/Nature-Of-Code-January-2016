var video;

// the scale with which the video and the animation maginfies
var videoScale = 2;

// setting the variables for video dimensions
var videoWidth = 256;
var videoHeight = 144;

function setup() {
  video = createVideo("video/video.mp4");
  
  createCanvas(videoWidth*videoScale,videoHeight*videoScale);
  
  // resize the video
  video.size(videoWidth*videoScale,videoHeight*videoScale);
  video.loop();
  
  noStroke();
  fill(0);
}

function draw() {
  background(245);
  
  video.loadPixels();
  var stepSize = 4;
  
  for (var y=0; y<videoHeight; y+=stepSize) {
    for (var x=0; x<videoWidth; x+=stepSize) {
      var i = y * videoWidth + x;
      
      // darkness is determined by averaging three r, g, b values
      var darkness = (255 - Math.floor((video.pixels[i*4]+video.pixels[i*4+1]+video.pixels[i*4+1])/3)) / 255;
      var radius = stepSize * darkness * videoScale;
        
      var rr = video.pixels[i*4];
      var gg = video.pixels[i*4+1];
      var bb = video.pixels[i*4+2];

      fill(rr,gg,bb);
      ellipse((x+stepSize/2)*videoScale, (y+stepSize/2)*videoScale, radius, radius);
    }
  }
}