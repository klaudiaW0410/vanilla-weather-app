function displayTemperature(response){
console.log(response.data);
let temperatureElement = document.querySelector("#temperature")
 temperatureElement.innerHTML = Math.round (response.data.temperature.current);
let cityElement = document.querySelector("#city")
  cityElement.innerHTML =(response.data.city);
let descriptionElement = document.querySelector("#description")
 descriptionElement.innerHTML = (response.data.condition.description);
 let humidityElement = document.querySelector("#humidity")
 humidityElement.innerHTML = (response.data.temperature.humidity);
 let windElement = document.querySelector("#wind")
 windElement.innerHTML = Math.round(response.data.wind.speed);
}


let apiKey = "bd44c7c3b23184830acea00o17tff244";
let apiUrl = "https://api.shecodes.io/weather/v1/current?query=New York&key=bd44c7c3b23184830acea00o17tff244&units=metric"


axios.get(apiUrl).then(displayTemperature);
         