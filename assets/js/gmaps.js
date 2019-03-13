


// centerMapOnVenue
// inputs
// latitude
// longitude
// side effects
// update the map with new center point
// define lat and lng variables
// set lat from ticket master venue
// set lng from ticket master venue
// call google maps fn with lat lng
// Google Maps API
var map;
var latitude = 32.715;
var longitude = -117.161;
var myLatLng = { lat: latitude, lng: longitude};
var venueName = 'San Diego';

// center maps on venue when ....
// ... the user clicks on the venue name
// $(document).on("click", "#venue", function () {
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


//test
function autofillCities() {
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "us"}
       };
    var input = document.getElementById("citySearch");
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}