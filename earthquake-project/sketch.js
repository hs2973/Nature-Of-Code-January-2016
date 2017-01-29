// base map image
var mapImg;

// width of the container containing the controls
var cntrlContainerWidth = 320;

// canvas dimensions
var canvasWidth = window.innerWidth-cntrlContainerWidth;
var canvasHeight = window.innerHeight;

// timestamp marker for when we want to start storing earthquakes
var timestamp_marker = Date.now() - (24*60*60*1000) * 365; // go certain days back

var increment_by = 1000*60*4; // in milliseconds
var start_timestamp = Math.ceil(timestamp_marker/increment_by);
var end_timestamp = Date.now();

var current_timestamp = start_timestamp;

// dictionary of all earthquakes
var earthquakes = {};

// array of earthquakes happening on screen
var current = [];

// flag for checking if the simulation is paused or not
var simulation_paused = true;

//minimum magnitude of earthquakes that we want to display
var minMag = 3;

function preload(){
  mapImg = loadImage("world-map.jpg");
  mapImg.resize(canvasWidth, canvasHeight);

  // load the earthquake data
  loadData();
}

var loadData = function(){
  // connect to Firebase API
  var earthquakeRef = new Firebase("https://publicdata-earthquakes.firebaseio.com/by_continent/");
  
  var continents = ['europe', 'asia', 'africa', 'north_america', 'south_america', 'antartica', 'oceanic']
  
  for(var i=0; i<=continents.length; i++){
    for(var mag=minMag; mag<=10; mag++){
      earthquakeRef.child(continents[i] + "/" + mag.toString()).on("child_added", saveEarthquake);
    }
  }
  
  function saveEarthquake(snapshot) {
      var eq = snapshot.val();
      
      if(eq.time >= timestamp_marker){
        // add earthquake to the earthquakes dictionary
        earthquakes[(Math.ceil(eq.time/increment_by)).toString()] = new Earthquake(eq.location.lat, eq.location.lng, eq.mag, eq.place, eq.time, eq.updated, eq.url);
      }
  }
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  // create the control container
  set_cntrlContainer();
}

function set_cntrlContainer(){
  var off_x = canvasWidth;
  
  var min_timestamp = timestamp_marker;
  var max_timestamp = Date.now();
  
  var html = '<h4>Earthquake Time-lapse Simulation</h4>'
    + '<p style="color: #FF0000; font-size: 13px;">Please select the start date and click "start" button to contine.</p>'
    + '<p><strong>select start date</strong></p>'
    + '<input id="start_date_slider" class="slider" type="range" min="'+min_timestamp.toString()+'" max="'+max_timestamp.toString()+'" value="'+min_timestamp.toString()+'">'
    + '<p id="start_date">'+new Date(Math.ceil(min_timestamp.toString()))+'</p>'
    + '<hr/>'
    + '<p><strong>select end date: disabled</strong></p>'
    + '<input id="start_date_slider" class="slider" type="range" min="0" max="255" value="255" disabled="true">'
    // + '<p>end date</p>'
    + '<p id="end_date">'+ new Date(end_timestamp) +'</p>'
    + '<input id="slider_button" type="button" value="start">'
    + '<div id="console" style="margin-top: 20px; font-size: 12px; overflow:scroll"></div>'
  ;
  
  // create the container
  var container = createDiv(html);

  // set the container position
  container.position(off_x,0);
  
  // add css class to the container
  container.addClass("cntrlContainer");
  
  // adjust height of the console based on its current offset
  $('#console').css('height', canvasHeight-$('#console').offset().top);
  
  $('#start_date_slider').on('mousemove', function(){
    $('#start_date').text(new Date(Math.ceil(this.value)));
    current_timestamp = Math.ceil(this.value/increment_by);
  });
  
  $('#slider_button').on('click', function(){
    if(this.value == "start"){
      simulation_paused = false;
      this.value = "stop";
      
      $('#start_date_slider').attr('disabled','disabled');
      
      consoleLog("#####################<br/>Simulation started at "+ Date() +"<br/>Start time: " + $('#start_date').text() + "<br/>End time: " + $('#end_date').text());
    }else{
      simulation_paused = true;
      this.value = "start";
      
      // flush current array
      current = [];
      
     $('#start_date_slider').removeAttr('disabled');
     
     consoleLog("#####################<br/>Simulation stopped at " + Date());
    }
  });
}

function consoleLog(log){
  var container = $('#console');
  container.append(log+"<hr/>");
  
  // automatically scroll the container to bottom when new content are added
  container.scrollTop(container.prop("scrollHeight") - container.height());
}

function draw() {
  background(mapImg);
  
  fill(0);
  noStroke();
  var current_date = new Date(current_timestamp*increment_by);
  textSize(13);
  text(current_date, 10, 20);
  
  if(!simulation_paused){
    if (current_timestamp.toString() in earthquakes){
      var eq = earthquakes[current_timestamp.toString()];
      current.push(eq);
      
      consoleLog("<a href='"+eq.url+"' target='_blank'>Mag " + eq.mag + " at " + eq.place + " (" + eq.lat + ", " + eq.lng + ")" + "</a><br/>" + new Date(eq.time));
    };
    
    current_timestamp += 1; // increment determined by increment_by variable

    if(current_timestamp > end_timestamp/increment_by){
      $('#slider_button').click();
    }
    
    current.forEach(function(eq){
      eq.display();
    });
  }
}