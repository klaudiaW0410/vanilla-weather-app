
function formatDate(timestamp) {
    let date= new Date(timestamp);
    let hours = date.getHours();
      if (hours < 10){
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
      minutes = `0${minutes}`;
    }
  
    let days = [
    "Sunday",
     "Monday", 
     "Tuesday", 
     "Wednesday", 
     "Thursday", 
     "Friday", 
     "Saturday"]
    let day =  days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

 } 
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
  


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML= `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index <6){
    forecastHTML =
    forecastHTML +
 `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
          <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png"
          alt=""
          width="42"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> ${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
          </div>
      </div>
      `;
      }
 });
 forecastHTML = forecastHTML +  `</div>`;
 forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apyKey = "oc8eab0a2081f8atcea9334203aad423";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apyKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
 let temperatureElement = document.querySelector("#temperature")
 let cityElement = document.querySelector("#city")
 let descriptionElement = document.querySelector("#description")
 let humidityElement = document.querySelector("#humidity")
 let windElement = document.querySelector("#wind")
 let dateElement = document.querySelector("#date")
 let iconElement = document.querySelector("#icon")

 celsiusTemperature = response.data.temperature.current
 
 temperatureElement.innerHTML = Math.round (celsiusTemperature);
 cityElement.innerHTML =(response.data.city);
 descriptionElement.innerHTML = (response.data.condition.description);
 humidityElement.innerHTML = (response.data.temperature.humidity);
 windElement.innerHTML = Math.round(response.data.wind.speed);
 dateElement.innerHTML = formatDate (response.data.time*1000);
 iconElement.setAttribute ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
 iconElement.setAttribute ("alt", response.data.condition.description);


 getForecast(response.data.coordinates);
} 

function search(city){
let apiKey = "bd44c7c3b23184830acea00o17tff244";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input")
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
 event.preventDefault();
let temperatureElement = document.querySelector("#temperature");

celsiusLink.classList.remove("active")
fahrenheitLink.classList.add("active")
let fahrenheitTemperature = ( celsiusTemperature * 9)/5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
 event.preventDefault();
 celsiusLink.classList.add("active")
fahrenheitLink.classList.remove("active")
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
}



let celsiusTemperature = null
// displayForecast();
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
         
let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink. addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink. addEventListener("click", displayCelsiusTemperature);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apyKey = "oc8eab0a2081f8atcea9334203aad423";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apyKey}`;
  axios.get(apiUrlCurrent).then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentPosition);

search("New York");

