
//when the user clicks the submit button...
$("#submit").on("click", function () {
    //prevent the page from refreshing
    event.preventDefault()
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
        var event = $("<p>").text(eventsArray[0].name)
        //get an image , put it in an image tag and append to the page
        var image = $("<img>").attr({ "src": eventsArray[0].images[0].url })
        $("#image").append(image)
        //get the venue, put it in a p tag, and append to the page:
        var venue = $("<p>").text(eventsArray[0]._embedded.venues[0].name)
        $("#venue").append(venue)
        //get the date/time, put it in a p tag, and append to the page
        var date = eventsArray[0].dates.start.localDate
        var time = eventsArray[0].dates.start.localTime
        var p = $("<p>").text(date + " at " + time)
        $('#date').append(p);
        //get ticketmaster url
        var tickets = eventsArray[0].url
        console.log("url" + tickets)
        $("#getTix").attr("href", tickets);        
    })
})

