var profile_img;

var page_likes = [];

function setup() {
  
}

function custom_setup(){
  //createCanvas(640,640);
  //background(175);

  fetch_likes("me/likes");
}

var likes_count = 0;

function fetch_likes(string){
  FB.api(
      string,
      function (response) {
        if (response && !response.error) {
          response.data.forEach(function(page){
            likes_count += 1;
            console.log(likes_count + ". " + page.name);
            console.log(page.created_time);
            
            page_likes.push(page);
          });
          
          if(typeof response.paging != "undefined"){
            fetch_likes(response.paging.next);
          }
        }
      }
  );
}

var custom_draw = function(){
  
};

function draw() {
  custom_draw();
}
