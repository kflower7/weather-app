// Time Display

let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinute} <br />
${currentMonth} ${currentDate}, ${currentYear} <br /> Sunny`;

  return formattedDate;
}

let todaysDate = document.querySelector("#data");
todaysDate.innerHTML = formatDate(currentTime);

//Search Bar

function cityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let h3 = document.querySelector("h3");
  let unit = "metric";
  let apiKey = "8093fe1963c31c9987ceadf7207e1360";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=${unit}&appid=${apiKey}`;
  h3.innerHTML = searchCity.value;
  axios.get(apiUrl).then(showMainTemperature);
}

function showMainTemperature(response) {
  let mainDegree = document.querySelector("#main-degree");
  let mainTemp = Math.round(response.data.main.temp);
  mainDegree.innerHTML = `${mainTemp}`;
}

let form = document.querySelector(".search-bar");
form.addEventListener("submit", cityName);

// Celcius to Fahrenheit (& vice versa)

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-degree");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * (9 / 5) + 32);
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-degree");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature - 32 * (9 / 5));
}

let fahrenheitElement = document.querySelector("#convert-fahrenheit");
fahrenheitElement.addEventListener("click", convertFahrenheit);

let celsiusElement = document.querySelector("#convert-celsius");
celsiusElement.addEventListener("click", convertCelsius);

// Current Location Bar

function currentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentCity);
}

function getCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8093fe1963c31c9987ceadf7207e1360";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentCity);
}

function showCurrentCity(response) {
  let currentCityDisplay = document.querySelector("#current-city-display");
  let currentCityName = response.data[0].name;
  let apiKey = "8093fe1963c31c9987ceadf7207e1360";
  let unit = "metric";
  let currentTemperatureUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&units=${unit}&appid=${apiKey}`;
  currentCityDisplay.innerHTML = `${currentCityName}`;
  axios.get(currentTemperatureUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let roundedCurrentTemp = Math.round(response.data.main.temp);
  let currentTemperatureDisplay = document.querySelector(
    "#current-temperature-display"
  );
  currentTemperatureDisplay.innerHTML = `${roundedCurrentTemp}°C`;
}

let currentData = document.querySelector("#current-location");
currentData.addEventListener("click", currentLocation);
