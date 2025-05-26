const apiKey = "1d2e681c5b7f058dd469784a1f73a657";
 // Replace with your actual API key

const searchInput = document.querySelector('.search-bar input');
const locationEl = document.querySelector('.location');
const imageEl = document.querySelector('.image-div img');
const temp1El = document.querySelector('.temp1');
const temp2El = document.querySelector('.temp2');
const wind2El = document.querySelector('.wind2');
const humidityEl = document.querySelector('.humidity');
const sunRiseEl = document.querySelector('.sun-rise-data');
const sunSetEl = document.querySelector('.sun-set-data');
const visibilityEl = document.querySelector('.visibility');

function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function unixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes}${ampm}`;
}

function updateWeather(data) {
  locationEl.textContent = data.name + ", " + data.sys.country;
  temp1El.textContent = kelvinToCelsius(data.main.temp) + "°C";
  temp2El.textContent = data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
  wind2El.textContent = (data.wind.speed * 3.6).toFixed(1) + " Km/h"; // m/s to km/h
  humidityEl.textContent = data.main.humidity + "%";
  visibilityEl.textContent = (data.visibility / 1000).toFixed(1) + " km"; // meters to km
  sunRiseEl.textContent = unixToTime(data.sys.sunrise);
  sunSetEl.textContent = unixToTime(data.sys.sunset);

  // Determine weather icon image based on weather conditions
  const weatherMain = data.weather[0].main.toLowerCase();
  const weatherDesc = data.weather[0].description.toLowerCase();

  if (weatherMain.includes('cloud')) {
    imageEl.src = "./images/cloudy.png";
  } else if (weatherMain.includes('rain')) {
    imageEl.src = "./images/rainy.png";
  } else if (weatherMain.includes('storm') || weatherMain.includes('thunder')) {
    imageEl.src = "./images/thunder.png";
  } else if (weatherMain.includes('snow')) {
    imageEl.src = "./images/snow.png";
  } else if (weatherDesc.includes('haze')) {
    imageEl.src = "./images/haze.png";
  } else if (weatherDesc.includes('mist')) {
    imageEl.src = "./images/mist.png";
  } else if (weatherDesc.includes('fog')) {
    imageEl.src = "./images/fog.png";
  } else if (weatherDesc.includes('dust')) {
    imageEl.src = "./images/dust.png";
  } else {
    // Default to sunny if none matched
    imageEl.src = "./images/sunny.png";
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    alert("Error fetching weather data: " + error.message);
  }
}

// Trigger search on enter key press inside input box
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});

// Load default weather for Noida on page load
window.onload = () => {
  getWeather("Noida");
};


