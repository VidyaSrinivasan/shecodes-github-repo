//Date format functions
function formattedDate(currentDateTime) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = currentDateTime.getDay();
  let currentDay = days[day];

  let currentHour = currentDateTime.getHours();
  if (currentHour < 10) {
    currentHour = "0".concat(currentHour);
  }
  let currentMinutes = currentDateTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = "0".concat(currentMinutes);
  }
  let prettyDateTime = `${currentDay} ${currentHour}:${currentMinutes}`;
  return prettyDateTime;
}

//Celsius/Farenheit functions
function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTempText = document.querySelector("#temperature-text");
  celsiusTempText.innerHTML = 66;
}

function convertToFarenheit(event) {
  event.preventDefault();
  let farenheitTempText = document.querySelector("#temperature-text");
  farenheitTempText.innerHTML = 19;
}

//Show city temperature function

function getCityInformation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city === "" || city === null) {
    alert("Enter a valid city");
  } else {
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showCityInformation);
  }
}

function showCityInformation(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-text");
  temperatureElement.innerHTML = temperature;
  let cityElement = document.querySelector(".city-title");
  let cityName = response.data.name;
  cityElement.innerHTML = cityName;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherDescription = response.data.weather[0].main;
  weatherDescriptionElement.innerHTML = weatherDescription;
}

//Set current location information

function setCurrentLocationInformation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityInformation);
}
//Display current day, date and time
let currentDateTime = new Date();
let displayDateTime = document.querySelector("#date");
displayDateTime.innerHTML = formattedDate(currentDateTime);

//Update city name to match searched city
let weatherSearch = document.querySelector("#city-search");
weatherSearch.addEventListener("submit", getCityInformation);

//Toggle and display °C and °F temperatures
let celsiusTemperature = document.querySelector("#celsius");
let farenheitTemperature = document.querySelector("#farenheit");

celsiusTemperature.addEventListener("click", convertToCelsius);
farenheitTemperature.addEventListener("click", convertToFarenheit);

let apiKey = "41c842fb32a7aba30866cb932b39ae3f";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let units = "metric";

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", setCurrentLocationInformation);
