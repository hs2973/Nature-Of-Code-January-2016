var profile_img;

function setup() {
  
}

function custom_setup(){
  createCanvas(640,640);
  background(175);

  FB.api(
      "/me/picture?height=640&width=640",
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          profile_img = loadImage(response.data.url, function(img){
            console.log("Profile Picture Url: " + response.data.url);
            pixelate();
          });
          
        }
      }
  );
}

function pixelate(){
  background(255);
  
  profile_img.loadPixels();
  var stepSize = 8;
  
  for (var y=0; y<640; y+=stepSize) {
    for (var x=0; x<640; x+=stepSize) {
      var i = y * 640 + x;
      
      // darkness is determined by averaging three r, g, b values
      var darkness = (255 - Math.floor((profile_img.pixels[i*4]+profile_img.pixels[i*4+1]+profile_img.pixels[i*4+1])/3)) / 255;
      var radius = stepSize * darkness;
        
      var rr = profile_img.pixels[i*4];
      var gg = profile_img.pixels[i*4+1];
      var bb = profile_img.pixels[i*4+2];

      fill(rr,gg,bb);
      rectMode(CENTER);
      rect((x+stepSize/2), (y+stepSize/2), radius, radius);
    }
  }
}

var custom_draw = function(){
  
};

function draw() {
  custom_draw();
}
