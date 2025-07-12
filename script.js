const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
const CITY = 'Pune'; // Change to your city

const timeEl = document.getElementById('time');
const weatherEl = document.getElementById('weather');

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  timeEl.textContent = `${hours}:${minutes}:${seconds}`;
  
  setTimeBackground(hours);
}

function setTimeBackground(hour) {
  hour = parseInt(hour);
  document.body.classList.remove('morning', 'afternoon', 'evening', 'night');

  if (hour >= 5 && hour < 12) {
    document.body.classList.add('morning');
  } else if (hour >= 12 && hour < 17) {
    document.body.classList.add('afternoon');
  } else if (hour >= 17 && hour < 20) {
    document.body.classList.add('evening');
  } else {
    document.body.classList.add('night');
  }
}

async function fetchWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`
    );
    const data = await res.json();
    const weather = data.weather[0].main.toLowerCase();
    weatherEl.textContent = `Current Weather: ${weather}`;
    setWeatherEffect(weather);
  } catch (err) {
    console.error('Weather fetch error:', err);
    weatherEl.textContent = 'Failed to fetch weather';
  }
}

function setWeatherEffect(weather) {
  document.body.classList.remove('rain', 'clear', 'clouds');
  if (weather.includes('rain')) {
    document.body.classList.add('rain');
  } else if (weather.includes('clear')) {
    document.body.classList.add('clear');
  } else if (weather.includes('clouds')) {
    document.body.classList.add('clouds');
  }
}

// Update every second
setInterval(updateClock, 1000);

// Fetch weather on load and every 10 minutes
fetchWeather();
setInterval(fetchWeather, 600000);
