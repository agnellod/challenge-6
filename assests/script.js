// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```
// skeleton HTML
    // search bar (form/input)
    // create divs where our data will be displayed
    // create weather, 5 day weather, list of history
// basic css
    // bring in dayjs
// space to store or house data

// check out data returned from apt
    // `https://openweathermap.org/forecst5

// Hint: if all of the data coming back from the above is not sufficient you may need to use another api



// Event listener
    // search button
    // each history button

//  make this a function
// write fetch call to api
    // find the information that we want to display from the api calll response
    // todays date and the 5 day forcast
    // programmatically display that data to the page
    // for loop 2 times
        // create x card
        // add x.header
        // addx.img
        // add x.temp
        //  add x.wind
        // add x.humidity
        // append x card to some div
        
        
        // localStorage
        // when the page loads grab all the cities in localStorage
        // when a city name is input into the form and the search button is clicked, append the city to existing localStorage
        // 
        
        
        // fetch call #1 (user will enter city name)
        // returns lag and long
        
        // fetch call #2 (takes in lat and long)
        // returns weather data
        
        // fetch #3 (takes in icon id)
        // returnns the actual image
        var city = $('#search-city');
        var searchBtn = $('#search-button');
        var pastSearches = $('#past-cities');
        var currentCity;
        var currentWeather =$('#current-weather');
        var fiveDayForecast =$('#5-day-forecast');
        var pastCity = JSON.parse(localStorage.getItem("past-cities")) || []
        // (5 day forecast api) api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
        //  (current weather api)  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        // (current weather api by city) https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        // dataContainer.innerHTML = ""; 
        
        
        
        
        const apiKey = "5361f87737b04f25bdea22949654ddb1"
    

    var geoLocation = function(event) {
        event.preventDefault();
        var cityVal = city.val()
        if ($(this).attr("id") === "search-button") {
            pastCity.push(city.val());
            renderSearch();
            }
            else {
                cityVal = $(this).text();
            }
        localStorage.setItem("past-cities", JSON.stringify(pastCity));
        var cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=imperial`;
        fetch (cityApi)
        .then(function (response) {
            return response.json()
            
        })
        .then(function(data) {
            currentWeather.empty();
            forecast(data)
            console.log(data);
            const ulEl = $('<ul>');
            const liDateEl = $('<li>');
            liDateEl.text(dayjs.unix(data.dt).format('ddd, MMMM DD, YYYY'));
            ulEl.append(liDateEl);
            const liCityEl = $('<li>');
            liCityEl.text(data.name);
            ulEl.append(liCityEl);
            const liIconEl = $('<li>');
            const iconImg = $('<img>');
            iconImg.attr('src','https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png')
            liIconEl.append(iconImg);
            ulEl.append(liIconEl);
            const liHumidityEl = $('<li>');
            liHumidityEl.text('humidity: ' + data.main.humidity + ' %' );
            ulEl.append(liHumidityEl);
            const liTempEl = $('<li>');
            liTempEl.text('Temp '+ data.main.temp +'°F');
            ulEl.append(liTempEl);
            const liWindEl = $('<li>');
            liWindEl.text('Wind Speed: ' + data.wind.speed +' MPH');
            ulEl.append(liWindEl);
            



            currentWeather.append(ulEl);

        })

    };
    var forecast = function(data) {
        var fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}&units=imperial`
        fetch (fiveDayApi)
        .then(function (response) {
            return response.json()
            
        })
        .then(function(data) {
            var arrayList = data.list;
            fiveDayForecast.empty();
            for (var i = 0; i < arrayList.length; i++) {
                if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
                    console.log(arrayList[i]);
            const ulEl = $('<ul>');
            const liDateEl = $('<li>');
            liDateEl.text(dayjs(data.list[i].dt_txt.split(" ")[0]).format('ddd, MMMM DD, YYYY'));
            ulEl.append(liDateEl);
            const liIconEl = $('<li>');
            const iconImg = $('<img>');
            iconImg.attr('src','https://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon +'@2x.png')
            liIconEl.append(iconImg);
            ulEl.append(liIconEl);
            const liHumidityEl = $('<li>');
            liHumidityEl.text('humidity: ' + data.list[i].main.humidity + ' %' );
            ulEl.append(liHumidityEl);
            const liTempEl = $('<li>');
            liTempEl.text('Temp '+ data.list[i].main.temp +'°F');
            ulEl.append(liTempEl);
            const liWindEl = $('<li>');
            liWindEl.text('Wind Speed: ' + data.list[i].wind.speed +' MPH');
            ulEl.append(liWindEl);
            console.log(data);
            fiveDayForecast.append(ulEl);
            } 
        }
        

});  
}
function renderSearch(){
    pastSearches.empty();
    for (let i = 0; i < pastCity.length; i++) {
    const city = pastCity[i];
    var btn = $('<button>');
    btn.text(city);
    pastSearches.append(btn);
}

}
    searchBtn.on("click", geoLocation);
    pastSearches.on("click", "button", geoLocation);
    renderSearch();
   
