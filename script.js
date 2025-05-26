// const apiKey = "1d2e681c5b7f058dd469784a1f73a657";

// document.querySelector(".search-bar input").addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     const city = e.target.value;
//     getWeather(city);
//   }
// });

// function getWeather(city) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       if (data.cod !== 200) {
//         alert("City not found");
//         return;
//       }

//       // Update location
//       document.querySelector(".location").textContent = data.name;

//       // Update temperature
//       document.querySelector(".temp1").textContent = `${Math.round(data.main.temp)}°`;

//       // Update weather description
//       document.querySelector(".temp2").textContent = data.weather[0].description;

//       // Update wind speed
//       document.querySelectorAll(".wind2")[0].textContent = `${data.wind.speed} Km/h`;

//       // Update humidity
//       document.querySelectorAll(".wind2")[1].textContent = `${data.main.humidity}%`;

//       // Update weather image
//       const iconCode = data.weather[0].icon;
//       const imgUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//       document.querySelector(".first-box img").src = imgUrl;
//       document.querySelector(".first-box img").alt = data.weather[0].main;
//     })
//     .catch(error => {
//       console.error("Error fetching weather data:", error);
//     });
// }




const apiKey = "1d2e681c5b7f058dd469784a1f73a657";

const weatherIconMap = {
  "clear": "./images/sunny.png",
  "cloud": "./images/cloudy.png",
  "rain": "./images/rainy.png",
  "snow": "./images/snow.png",
  "thunder": "./images/thunder.png",
  "drizzle": "./images/drizzle.png",
  "mist": "./images/mist.png",
  "smoke": "./images/smoke.png",
  "haze": "./images/haze.png",
  "dust": "./images/dust.png",
  "fog": "./images/fog.png"
};

document.querySelector(".search-bar input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) getWeather(city);
  }
});

document.querySelector(".search-bar .bi-search")?.addEventListener("click", () => {
  const city = document.querySelector(".search-bar input").value.trim();
  if (city) getWeather(city);
});

function getWeather(city) {
  console.log("Fetching weather for:", city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      console.log("Weather API data:", data);

      document.querySelector(".location").textContent = data.name;
      document.querySelector(".temp1").textContent = `${Math.round(data.main.temp)}°C`;
      document.querySelector(".temp2").textContent = capitalizeFirstLetter(data.weather[0].description);
      document.querySelectorAll(".wind2")[0].textContent = `${data.wind.speed} Km/h`;
      document.querySelectorAll(".wind2")[1].textContent = `${data.main.humidity}%`;

      const description = data.weather[0].description.toLowerCase();
      let matchedIcon = "./images/sunny.png"; // default icon path

      for (const key in weatherIconMap) {
        if (description.includes(key)) {
          matchedIcon = weatherIconMap[key];
          break;
        }
      }

      console.log("Description:", description, "Matched icon:", matchedIcon);

      const imgEl = document.querySelector(".image-div img");
      if (imgEl) {
        imgEl.src = matchedIcon;
        imgEl.alt = data.weather[0].main;
        console.log("Image element updated.");
      } else {
        console.error("Image element not found!");
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Something went wrong. Please try again.");
    });
}