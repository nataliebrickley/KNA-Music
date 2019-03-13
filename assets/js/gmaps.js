
// Google Maps API
var map;
var latitude = 32.715;
var longitude = -117.161;
var myLatLng = { lat: latitude, lng: longitude};
var venueName = 'San Diego';

// center maps on venue 
console.log("lat: " + latitude + "lng: " + longitude);
// Initialize the map.
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 12
    });
    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: venueName,
      });
};

// var script = $("<script scr='https://maps.googleapis.com/maps/api/js?key=AIzaSyBnIs9SWvCoCykKiXFp_MvafcDjcSrh0DU&callback=initMap' async defer>");
// script.appendTo("#gmap-script");
// });
