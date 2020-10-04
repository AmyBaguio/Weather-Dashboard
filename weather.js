

// var APIKey = "88afaf5d902bd0951e5afcfd34451691";


function createForeCastCard(date, icon, temp, humidity) {

    let card = $("<div>")
    card.attr("class", "card")

    let cardBody = $("<div>")
    cardBody.attr("class", "card-body");

    let cardTitle = $("<h4>")
    cardTitle.attr("class", "card-title");
    cardTitle.text(date);
    cardBody.append(cardTitle);

    let img = $("<img>");
    img.attr("src", icon);
    cardBody.append(img);

    // crete the p tags
    let cardText = $("<p>")
    cardText.attr("class", "card-text");
    cardText.text(date);
    cardBody.append(cardTitle);


    card.append(cardBody);

    return card;

}


$("#find-city").on("click", function (event) {
    event.preventDefault();

    // Here we grab the text from the input box
    const city = $("#city-input").val().trim();


    // current weather forecast URL //
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=88afaf5d902bd0951e5afcfd34451691";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $(".city").html("<h1>" + response.name + "</h1>");
        $(".icon").text("icon" + response.weather.icon);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well

        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
    });

});

// Search History List View



// Displaying 5-Day Forecast

$("#find-city").on("click", function (event) {
    event.preventDefault();

    // Here we grab the text from the input box
    const city = $("#city-input").val().trim();

    // 5 Day ForeCast URL
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=88afaf5d902bd0951e5afcfd34451691";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        const results = response.list;

        let dailyForecast = []
        for (let index = 0; index < results.length; index += 8) {
            const element = results[index];
            dailyForecast.push(element)
        }

        console.log(dailyForecast)

        for (let index = 0; index < dailyForecast.length; index++) {
            const element = dailyForecast[index];
            const card = createForeCastCard(moment(element.dt_txt).format('YYYY'), "", 15, 60)
            $('.forecast-view').append(card);
        }
    })
});