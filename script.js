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

      