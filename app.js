const date = {
    time: [
      '2025-03-11',
      '2025-03-12',
      '2025-03-13',
      '2025-03-14',
      '2025-03-15',
      '2025-03-16',
      '2025-03-17',
    ],
    temperature_2m: [25.4, 27.2, 28.9, 29.5, 30.4, 30.7, 30.8],
  };

  
  const formattedDate = (date) => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
  
    const newFormat = new Date(date);
    return newFormat.toLocaleDateString('en-GB', options);
  };

  console.log(formattedDate('2025-03-13'))
  

  document.addEventListener("DOMContentLoaded", function () {});

const cardContainer = document.querySelector(".card-container"); 
console.log(cardContainer)
cardContainer.innerHTML = '';

for (let i = 0; i < 6; i++) { 
    let cardHTML = `
      <div class="card rounded-4" style="max-width: 540px; background-color: #FFFDEF;">
          <div class="row g-0 align-items-center" style="color: #3F3F3F;">
              <!-- Left side: Temperature details -->
              <div class="col-md-9">
                  <div class="card-body">
                      <div class="card-title text-start mb-0 plus-jakarta-sans-bold">
                          <div class="temperature d-flex align-items-start">
                              <span class="temp-number">25</span>
                              <span class="temp-unit">°C</span>
                          </div>
                          <div class="date-right">
                              <p class="card-text text-start plus-jakarta-sans-medium">
                                ${formattedDate(date.time[i])}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- Right side: Image -->
              <div class="col-md-3 d-flex justify-content-end">
                  <img src="iconoir_wind.png" class="img-fluid rounded-end me-2" width="80" alt="Weather Icon">
              </div>
          </div>
      </div>
    `;

    cardContainer.innerHTML += cardHTML; 
}

const URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,wind_speed_10m,wind_direction_10m,relative_humidity_2m,weather_code';

  
const getWeather = async (latitude, longitude) => {
  const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,apparent_temperature_max,apparent_temperature_min&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,wind_direction_10m,surface_pressure`;

  const response = await fetch(WEATHER_URL);
  const data = await response.json();

  date.innerText = formattedDate(data.current.time);
  temperature.innerText = data.current.temperature_2m;
  description.innerText = WMO[data.current.weather_code].day.description;
  windSpeed.innerText = data.current.wind_speed_10m + ' km/h';
  windDirection.innerText = data.current.wind_direction_10m + ' °';
  humidity.innerText = data.current.relative_humidity_2m + ' %';
  airPressure.innerText = data.current.surface_pressure + ' hPa';

  weatherIcon.innerHTML = `<img src="${
    WMO[data.current.weather_code].day.image
  }"/>`;

  daily.innerHTML = '';

  for (let i = 1; i < data.daily.time.length; i++) {
    daily.innerHTML += `
      <div class="col-2">
        <div class="card bg-dark bg-gradient text-white text-center rounded-5 border-0" style="min-height: 320px">
          <div class="card-body d-flex flex-column">
            <h5 class="fs-5">${formattedShortDate(data.daily.time[i])}</h5>
            <img src="${
              WMO[data.daily.weather_code[i]].day.image
            }" width="150" style="margin: 0 auto;" />
            <span class="fs-6">${
              WMO[data.daily.weather_code[i]].day.description
            }</span>
            <div class="d-flex justify-content-between mt-4 mx-2">
              <span class="text-secondary">${
                data.daily.apparent_temperature_min[i]
              }°C</span>
              <span>${data.daily.apparent_temperature_max[i]}°C</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

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
