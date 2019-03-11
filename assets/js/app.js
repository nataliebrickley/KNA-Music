// Psuedo Code KNA Music Project

// create one js file to deal with:
    // initial page
        // add event listener for main page submit button
        // on.click -> 
            // capture the text in the input form and feed it to firebase
            // open our main content page   
    
// Main Content Page
    // populate the page with pregenerated buttons
        // could TM feed us info on similar artists to populate our buttons with?     
    // add a button for the search term used on initial page - get the info from firebase
    // populate #main-content with information about the search term used on the initial page
        // Title of artist/band
        // Info on 3-5 next shows
            // date, venue, time permitting info from a wiki api
            // link to buy tickets for each show - tmAPI 
        // If you click the venue name (or create a button for this),
            // capture the venue address or perhaps just name and feed it to the googleAPI
            // change the img card/container/div to be a google map of the venue location 
    // add an img from tm API of the artist to the page 
        // this img will turn into the map when the venue button is clicked on 

        // listen for search click 

// // Google Map API practice //
// var map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: -34.397, lng: 150.644},
//         zoom: 8
//     });
//     }    

$("#submit").on("click", function (event) {
    event.preventDefault()
    var userInput = $("#artist").val();
    var newButton = $('<button>').text(userInput);
    $("#artist-buttons").append(newButton);

})


   

//when the user clicks the submit button...
$("#submit").on("click", function () {
    //prevent the page from refreshing
    event.preventDefault()
    //clear previous input results:
    $("#eventName").empty();
    $("#venue").empty();
    $("#image").empty();
    $("#date").empty();
    $("#info").empty();
    $("#city").empty();

    //get the search input and create api url
    var citySearch = $("#citySearch").val().trim()
    var keyword = $("#artist").val().trim()
    var apiKey = "3mMDHc6bID67MAw2IOA8EkaoYav83WWr";
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&city=" + citySearch + "&apikey=" + apiKey
    //make api request
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //access the events array
        var eventsArray = response._embedded.events
        //get the event name and put it in a p tag:
        var event = $("<h2>").text(eventsArray[0].name)
        $("#eventName").append(event)
        //get an image , put it in an image tag and append to the page
        //loop through the images until there is one with a width>300
        var imageArray = eventsArray[0].images
        function getImage(array) {
            for (var i = 0; i < imageArray.length; i++) {
                if (imageArray[i].width >= 300) {
                    var imageUrl = imageArray[i].url
                    return imageUrl
                }
                else {
                    var imageUrl = imageArray[1].url
                    return imageUrl
                }
            }
        }
        var imageUrl = getImage(imageArray)
        var image = $("<img>").attr({ "src": imageUrl, "id": "eventImage" })
        $("#image").append(image)
        //get the venue, put it in a p tag, and append to the page:
        var venue = $("<p>").html("<b>Venue:</b> " + eventsArray[0]._embedded.venues[0].name)
        $("#venue").append(venue)
        //get the city, put it in a p tag, and append to the page:
        var city = eventsArray[0]._embedded.venues[0].city.name;
        var state = eventsArray[0]._embedded.venues[0].state.stateCode;
        var location = $("<p>").html("<b>City:</b> " + city + ", " + state)
        $("#city").append(location)
        //get the date and format it
        var date = eventsArray[0].dates.start.localDate
        var formatDate = moment(date).format("MMMM Do YYYY")
        //get the time, and convert from military time to normal time
        var time = eventsArray[0].dates.start.localTime
        var formatTime = moment(time, 'HH:mm').format('hh:mm a')
        //append date/time to the page
        var p = $("<p>").html("<b>Date:</b> " + formatDate + " at " + formatTime)
        $('#date').append(p);
        //seat map url:
        var seatMap = $("<a>").attr({ "href": eventsArray[0].seatmap.staticUrl, "target": "_blank" }).text("Seat Map")
        $("#venue").append(seatMap)
        //get ticketmaster url
        var tickets = eventsArray[0].url
        $("#getTix").attr("href", tickets);
        //get info about event
        var info = $("<p>").text(eventsArray[0].info)
        $("#info").append(info)

    })
    
    

})

