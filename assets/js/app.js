

$("#submit").on("click", function () {
    event.preventDefault()
    var keyword = $("#artist").val().trim()
    var apiKey = "3mMDHc6bID67MAw2IOA8EkaoYav83WWr";
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&apikey=" + apiKey
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var eventsArray = response._embedded.events
        for(var i = 0; i<eventsArray.length; i++) {
            var event = $("<p>").text(eventsArray[i].name)
            var image = $("<img>").attr({"src": eventsArray[i].images[0].url})
            $("#event").append(event, image)
        }
    })
})

