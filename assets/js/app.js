var venue = "";

$("#submit").on("click", function (event) {
    event.preventDefault()
    var userInput = $("#artist").val();
    var newButton = $('<button>').text(userInput);
    $("#artist-buttons").append(newButton);
});


   

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
        // saving the lat and lng as data-lat and data-lng to be used by gmaps
        venue = $("<p>").html("<b>Venue:</b> " + eventsArray[0]._embedded.venues[0].name)
        venue.attr("data-lat", eventsArray[0]._embedded.venues[0].location.latitude);
        venue.attr("data-lng", eventsArray[0]._embedded.venues[0].location.longitude);
        latitude = parseFloat(eventsArray[0]._embedded.venues[0].location.latitude);
        longitude = parseFloat(eventsArray[0]._embedded.venues[0].location.longitude);
        console.log("latitdue: " + latitude + " Longitude: " + longitude);
        venue.attr("id", "venue");
        $("#venue").append(venue);    
        //get the city, put it in a p tag, and append to the page:
        var city = eventsArray[0]._embedded.venues[0].city.name;
        var state = eventsArray[0]._embedded.venues[0].state.stateCode;
        var location = $("<p>").html("<b>City:</b> " + city + ", " + state);
        $("#city").append(location);
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

