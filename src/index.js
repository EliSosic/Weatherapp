function updateWeather (response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let conditionsElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity-value");
    let windElement = document.querySelector("#wind-value");
    let windSpeed = response.data.wind.speed;
    let dateElement = document.querySelector ("#date");
    let date = new Date(response.data.time * 1000);

    let weatherEmojiElement = document.querySelector("#weather-emoji");
    weatherEmojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;

 // console.log(response.data);

    cityElement.innerHTML = response.data.city;
    dateElement.innerHTML = formatDate(date);
    conditionsElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${Math.round(windSpeed)} km/h`;

    getForecast(response.data.city);

}

function formatDate (date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}, ${hours}:${minutes}`;

}

function searchCity(city) {
    let apiKey = "3c836392eab01t60930bboe42ecabfe4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}
function handleSearchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
   
    searchCity(searchInput.value);
}

function formatDay (timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", 
    "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast (city) {
    let apiKey = "3c836392eab01t60930bboe42ecabfe4";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios(apiUrl).then(displayForecast);
console.log (apiUrl);
}



function displayForecast (response) {

    console.log (response.data);

    
    let forecastHtml = "";

    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
        forecastHtml = forecastHtml + 
        `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">
    ${formatDay(day.time)} </div>
        <img src = "${day.condition.icon_url}"
         width="50" /> 
        <div class="weather-forecast-temperature"> 
         <span class="weather-forecast-temperature-max"> ${Math.round(day.temperature.maximum)}° </span>  
        <span class="weather-forecast-temperature-min"> ${Math.round(day.temperature.minimum)}°</span>
      </div> 
      </div>
    `;
    }
    });

    let forecastElement = document.querySelector ("#weather-forecast");

    forecastElement.innerHTML = forecastHtml;
    
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Trieste");



