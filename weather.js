

// To display current city search result


// Search History List View
$(document).ready(function () {

    function createIconUrl(iconcode) {
        return "https://openweathermap.org/img/w/" + iconcode + ".png";

    }
    function searchWeather(city) {


        // current weather forecast URL //
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=88afaf5d902bd0951e5afcfd34451691";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $(".city").html("<h1>" + response.name + "</h1>");
            $(".currentdate").html(moment(response.dt_txt).format('YYYY-MM-DD'));
            $(".icon").attr("src", createIconUrl(response.weather[0].icon));
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
        
    };
    
    
    const APIKey = "88afaf5d902bd0951e5afcfd34451691";

    renderHistoryList();

    $("#find-city").on("click", function (event) {
        event.preventDefault();

        // get the user input
        const citySearch = $("#city-input").val();

        // save user input to local storage

        // get the existing value in LS
        const existed = JSON.parse(localStorage.getItem('historyItems')) || [];

        // add to the list
        existed.push(citySearch);

        // save the updated list in LS
        localStorage.setItem('historyItems', JSON.stringify(existed));

        // call the api
        //clear input box
        searchWeather(citySearch);

        searchForecasts(citySearch);
        $("#city-input").val("");
        renderHistoryList()

    });

    function renderHistoryList() {

        // clear the content of history items
        $(".historyItems").empty();

        // get all the items in LS,
        const historyList = JSON.parse(localStorage.getItem('historyItems')) || [];

        // for each item, we generate a li element
        for (let index = 0; index < historyList.length; index++) {
            const city = historyList[index];
            const li = $("<li>").addClass("list-group-item list-group-item-action").text(city);

            // append li to '.historyItems'
            $(".historyItems").append(li);
        }


    }


    $(".historyItems").on("click", "li", function (event) {
        event.preventDefault();

        // story 

        // when we click on a city
        const city = $(event.target).text();

        // we call the api based on that city
        searchWeather(city);

        searchForecasts(city);

    });



    // Creating Forecast Card
    function createForeCastCard(date, icon, temp, humidity) {
    
        let card = $("<div>")
        card.attr("class", "card col")
    
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
        let cardTemp = $("<p>")
        cardTemp.attr("class", "card-text");
        cardTemp.text('Temp: ' + temp + 'K');
        cardBody.append(cardTemp);
    
        
        let cardHumidity = $("<p>")
        cardHumidity.attr("class", "card-text");
        cardHumidity.text(humidity);
        cardBody.append(cardHumidity);
    
    
        card.append(cardBody);
    
        return card;
    
    }
    // Displaying 5-Day Forecast
    
    function searchForecasts(city) {

        $(".forecast-view").empty();
    
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
                const card = createForeCastCard(moment(element.dt_txt).format('YYYY-MM-DD'), createIconUrl(element.weather[0].icon), element.main.temp, element.main.humidity)
                $('.forecast-view').append(card);
               
            }
        })
    };
})
