//Date format functions
function formattedDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  let currentDay = days[day];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = "0".concat(currentHour);
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = "0".concat(currentMinutes);
  }
  let prettyDateTime = `Last updated at: ${currentDay} ${currentHour}:${currentMinutes}`;
  return prettyDateTime;
}

//Celsius/Farenheit functions
function convertToCelsius(event) {
  event.preventDefault();
  temperatureTextElement.innerHTML = celsiusTempText;
  celsiusTemperatureElement.classList.add("active");
  farenheitTemperatureElement.classList.remove("active");
}

function convertToFarenheit(event) {
  event.preventDefault();

  let farenheitTempText = Math.round((celsiusTempText * 9) / 5 + 32);
  temperatureTextElement.innerHTML = farenheitTempText;
  farenheitTemperatureElement.classList.add("active");
  celsiusTemperatureElement.classList.remove("active");
}

//Show city temperature function

function getCityInformation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city === "" || city === null) {
    alert("Enter a valid city");
  } else {
    getCityApi(city);
  }
}

function getCityApi(city) {
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityInformation);
}

function showCityInformation(response) {
  celsiusTempText = Math.round(response.data.main.temp);
  temperatureTextElement.innerHTML = celsiusTempText;
  let cityElement = document.querySelector(".city-title");
  let cityName = response.data.name;
  cityElement.innerHTML = cityName;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherDescription = response.data.weather[0].main;
  weatherDescriptionElement.innerHTML = weatherDescription;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = humidity;

  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = wind;

  let weatherIconElement = document.querySelector("#weather-icon");
  iconId = response.data.weather[0].icon;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  let displayDateTimeElement = document.querySelector("#date");
  displayDateTimeElement.innerHTML = formattedDate(response.data.dt * 1000);
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

//Initilization and declaration
let apiKey = "41c842fb32a7aba30866cb932b39ae3f";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let units = "metric";
let celsiusTempText = null;

getCityApi("London");

//Update city name to match searched city
let weatherSearchElement = document.querySelector("#city-search");
weatherSearchElement.addEventListener("submit", getCityInformation);

//Toggle and display °C and °F temperatures
let temperatureTextElement = document.querySelector("#temperature-text");
let celsiusTemperatureElement = document.querySelector("#celsius");
let farenheitTemperatureElement = document.querySelector("#farenheit");

celsiusTemperatureElement.addEventListener("click", convertToCelsius);
farenheitTemperatureElement.addEventListener("click", convertToFarenheit);

let currentButtonElement = document.querySelector("#current");
currentButtonElement.addEventListener("click", setCurrentLocationInformation);
