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


database.ref().on("child_added", function (snapshot) {
  // prevents the page from refreshing when clicked
  event.preventDefault();


  var performer = snapshot.val().name;
  // var newButton = snapshot.text(performer);
  var p = $("<button id= buttonInfo>").text(snapshot.val().name)
  $("#artist-buttons").append(p);

});


// adding artist Button (keeps adding two buttons)
$("#submit").on("click", function (event) {
  //event.preventDefault();

  // grabs user input
  var artist = $("#artist").val().trim();
  var newArtist = {
    name: artist
  }
  // uploads information to firebase
  database.ref().push(newArtist);

  //console.log(newArtist.name)

});

// connecting button to artist info for quick search
$(document).on("#buttonInfo", function(){
 

});