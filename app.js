const daily = document.getElementById('daily');

const cityDisplay = document.getElementById('city-display');
const date = document.getElementById('date');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const airPressure = document.getElementById('air-pressure');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');



const formattedDate = (date) => {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  const newFormat = new Date(date);
  return newFormat.toLocaleDateString('en-GB', options);
};


const getWeather = async () => {
  const WEATHER_URL = 
  "https://api.open-meteo.com/v1/forecast?latitude=-6.2146&longitude=106.8451&daily=weather_code,apparent_temperature_max&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,surface_pressure&timezone=auto"

  const response = await fetch(WEATHER_URL);
  const data = await response.json();
  
  date.innerText = formattedDate(data.current.time)
  temperature.innerText = data.current.temperature_2m + ' °C'
  humidity.innerText = data.current.relative_humidity_2m + ' %';
  airPressure.innerText = data.current.surface_pressure + ' hPa';
  windSpeed.innerText = data.current.wind_speed_10m + ' km/h';


  const cardContainer = document.querySelector(".card-container"); 
  cardContainer.innerHTML = '';
  for (let i = 1; i < data.daily.time.length; i++) {
    cardContainer.innerHTML += `<div class="card rounded-4" style="max-width: 540px; background-color:rgb(34, 34, 34);">
          <div class="row g-0 align-items-center" style="color:rgb(170, 170, 170);">
              <!-- Left side: Temperature details -->
              <div class="col-md-9">
                  <div class="card-body">
                      <div class="card-title text-start mb-0 plus-jakarta-sans-bold" id="daily">
                          <div class="temperature d-flex align-items-start">
                              <span class="temp-number">${data.daily.apparent_temperature_max[i]}</span>
                              <span class="temp-unit">°C</span>
                          </div>
                          <div class="date-right">
                              <p class="card-text text-start plus-jakarta-sans-medium">
                                ${formattedDate(data.daily.time[i])}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- Right side: Image -->
              <div class="col-md-3 d-flex justify-content-end">
                  <img src="${WMO[data.daily.weather_code[i]].day.image}" class="img-fluid rounded-end me-2" width="80" alt="Weather Icon">
              </div>
          </div>
      </div>
    `;
  }
}

getWeather();


const getGeocoding = async () => {
  let name = cityName.value;
  cityDisplay.innerText = name;

  const GEOCODING_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`;

  const response = await fetch(GEOCODING_URL);
  const data = await response.json();

  let latitude = data.results[0].latitude;
  let longitude = data.results[0].longitude;

  getWeather(latitude, longitude);
};

const getLocation = () => {
  cityDisplay.innerText = 'Jakarta';

  navigator.geolocation.getCurrentPosition((position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  });
};

getLocation();