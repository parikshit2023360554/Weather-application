const apiKey = "1d2e681c5b7f058dd469784a1f73a657";

document.querySelector(".search-bar input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const city = e.target.value;
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      // Update location
      document.querySelector(".location").textContent = data.name;

      // Update temperature
      document.querySelector(".temp1").textContent = `${Math.round(data.main.temp)}°`;

      // Update weather description
      document.querySelector(".temp2").textContent = data.weather[0].description;

      // Update wind speed
      document.querySelectorAll(".wind2")[0].textContent = `${data.wind.speed} Km/h`;

      // Update humidity
      document.querySelectorAll(".wind2")[1].textContent = `${data.main.humidity}%`;

      // Update weather image
      const iconCode = data.weather[0].icon;
      const imgUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.querySelector(".first-box img").src = imgUrl;
      document.querySelector(".first-box img").alt = data.weather[0].main;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}
