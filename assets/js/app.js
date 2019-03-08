
//when the user clicks the submit button...
$("#submit").on("click", function () {
    //prevent the page from refreshing
    event.preventDefault()
    //clear previous input results:
    $("#eventName").empty();
    $("#venue").empty();
    $("#image").empty();
    $("#date").empty();
    //get the search input and create api url
    var keyword = $("#artist").val().trim()
    var apiKey = "3mMDHc6bID67MAw2IOA8EkaoYav83WWr";
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&apikey=" + apiKey
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
        var image = $("<img>").attr({ "src": eventsArray[0].images[0].url })
        $("#image").append(image)
        //get the venue, put it in a p tag, and append to the page:
        var venue = $("<p>").text("Venue: " + eventsArray[0]._embedded.venues[0].name)
        $("#venue").append(venue)
        //get the date/time, put it in a p tag, and append to the page
        var date = eventsArray[0].dates.start.localDate
        var time = eventsArray[0].dates.start.localTime
        var p = $("<p>").text("Date: " + date + " at " + time)
        $('#date').append(p);
        //seat map url:
        var seatMap = $("<a>").attr({"href": eventsArray[0].seatmap.staticUrl, "target": "_blank"}).text("Seat Map")
        $("#venue").append(seatMap)
        //get ticketmaster url
        var tickets = eventsArray[0].url
        $("#getTix").attr("href", tickets);   
        //get info about event
        var info = $("<p>").text(eventsArray[0].info)
        $("#info"). append(info)     
    })
})

