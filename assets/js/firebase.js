// Initialize Firebase
var config = {
  apiKey: "AIzaSyDz6i7urZwXZTC91jBo0EVgVrcoG7F5X_E",
  authDomain: "kna-muisc.firebaseapp.com",
  databaseURL: "https://kna-muisc.firebaseio.com",
  projectId: "kna-muisc",
  storageBucket: "kna-muisc.appspot.com",
  messagingSenderId: "44555496077"
};
firebase.initializeApp(config);
var database = firebase.database();
//test
var citySearch = localStorage.getItem("city");
var keyword = localStorage.getItem("artist");
wikiLink(keyword)
var newArtist = {
  name: keyword,
  location: citySearch
}
console.log(newArtist)
database.ref().push(newArtist);
localStorage.clear()
//
database.ref().on("child_added", function (snapshot) {
  // prevents the page from refreshing when clicked
  //event.preventDefault();

// These are the added buttons
  var performer = snapshot.val().name;
  // var newButton = snapshot.text(performer);
  var p = $("<button id= buttonInfo>").text(snapshot.val().name)

  p.attr("data-artist", snapshot.val().name)
  p.attr("data-city", snapshot.val().location)

  $("#artist-buttons").append(p);

});


// adding artist Button 
$("#submit").on("click", function (event) {
  //event.preventDefault();

  // grabs user input
  var artist = $("#artist").val().trim();
  if (artist !== '') {
    wikiLink(artist)
  var city = $("#citySearch").val().trim().split(",")[0];
  var newArtist = {
    name: artist,
    location: city
  }
  // uploads information to firebase
  database.ref().push(newArtist);
  }
  

  //console.log(newArtist.name)

});

// connecting button to artist info for quick search

$(document).on("click", "#buttonInfo", function () {
  $("#eventName").empty();
  $("#venue").empty();
  $("#image").empty();
  $("#date").empty();
  $("#info").empty();
  $("#city").empty();
  $("#map").empty();
  citySearch = $(this).attr("data-city")
  keyword = $(this).attr("data-artist")
  wikiLink(keyword);
  console.log(keyword)
  console.log(citySearch)
  apiKey = "3mMDHc6bID67MAw2IOA8EkaoYav83WWr";
  apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&city=" + citySearch + "&apikey=" + apiKey
  ajaxCall();
});

$(document).on("click", "#reset", function() {
  database.ref().remove();
});

database.ref().on("child_removed", function(snap) {
  $("#artist-buttons").empty();
});

function wikiLink(artist) {
  var url = "https://en.wikipedia.org/wiki/" + artist
  $("#wiki").attr({"href": url, "target": "_blank" })
}
