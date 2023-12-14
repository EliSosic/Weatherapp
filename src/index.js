function updateWeather (response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let conditionsElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity-value");
    let windElement = document.querySelector("#wind-value");
    let windSpeed = response.data.wind.speed;

  //console.log(response.data);

    cityElement.innerHTML = response.data.city;
    conditionsElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${Math.round(windSpeed)} km/h`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Trieste");