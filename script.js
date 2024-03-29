// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.parallax');
//     var instances = M.Parallax.init(elems, options);
//   });

$(document).ready(function(){
  $('.parallax').parallax();
});

var map, infoWindow, userPosition, geocoder;
var eligibility = 0;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
             var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            userPosition = pos;
            console.log(userPosition);
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // map.setCenter(pos);

            geocoder.geocode({'location': pos}, function(results, status) {
              if (status === 'OK') {
                if (results[0]) {
                  map.setZoom(11);
                  var marker = new google.maps.Marker({
                    position: pos,
                    map: map
                  });

                  // log the result on the console and display it with the marker on the map
                  console.log(results);
                  infoWindow.setPosition(pos);
                  infoWindow.setContent(results[0].formatted_address);
                  infoWindow.open(map, marker);
                  map.setCenter(pos);
            
                  // infowindow.setContent(results[0].formatted_address);
                  // infowindow.open(map, marker);

                  if(results[11].formatted_address == "United States"){
                    eligibility = 1;
                    console.log("Worker is eligible."+eligibility);
                  }
                  else{
                    eligibility = 0;
                    console.log("Oops! Worker ineligible to work." +eligibility);
                  }

                } else {
                  window.alert('No results found');
                }
              } else {
                window.alert('Geocoder failed due to: ' + status);
              }
            });

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      var mouseClickedPositions = [];
      var canvas = document.getElementById("imageCanvas");
      var ctx = canvas.getContext("2d");
      var imageObj = new Image();
      imageObj.onload = function(){
          renderGraphics();
      }
      imageObj.src = "https://files.cdn.printful.com/upload/variant-image-jpg/21/2134a3fa668449b50adffcc6313aafb9_l";

      
      canvas.addEventListener('mousedown', function(event){
        var mousePosition = getMousePosition(event);
        mouseClickedPositions.push(mousePosition);
        renderGraphics();
      }, false);
      window.addEventListener('keypress', function(event){
        event.preventDefault();
        mouseClickedPositions.pop();
        renderGraphics();
    });
    function getMousePosition(event){
        var mousePositionX = event.clientX;
        var mousePositionY = event.clientY;
        // the following command will get the coordinates for our canvas
        var rect = canvas.getBoundingClientRect();
        var xcoord = mousePositionX - rect.left;
        var ycoord = mousePositionY - rect.top;
        return {xcoord, ycoord};
    }

    function renderGraphics(){
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
      ctx.drawImage(imageObj,0, 0);
      ctx.fillStyle = "#b3c100";
      if(mouseClickedPositions.length > 0){
        for(var i=0; i<mouseClickedPositions.length; i++){
            var currentMousePosition = mouseClickedPositions[i];
            ctx.fillRect(currentMousePosition.xcoord, currentMousePosition.ycoord, 5, 5);
            if(i==0){
                ctx.beginPath();
            }
            if(i > 0){
                ctx.moveTo(mouseClickedPositions[i-1].xcoord, mouseClickedPositions[i-1].ycoord);
                ctx.lineTo(currentMousePosition.xcoord, currentMousePosition.ycoord);
                ctx.strokeStyle = "#34675c";
                ctx.stroke();
            }
        }   
    }
    }