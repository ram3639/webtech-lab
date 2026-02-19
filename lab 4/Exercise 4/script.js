

let resultDiv = document.getElementById("result");

// CACHE
let lastCityCache = {};

function getWeather() {
  let city = document.getElementById("city").value.trim();

  if (city.length == 0) return;

  // CACHE CHECK
  if (lastCityCache[city]) {
    displayWeather(lastCityCache[city]);
    return;
  }

  // LOADING
  resultDiv.innerHTML =
    "<div class='loading'><div class='spinner'></div><p>Loading...</p></div>";

  // AJAX GET REQUEST
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  )
    .then((response) => {
      if (response.status === 404) {
        throw new Error("Invalid City Name (404)");
      }

      if (response.status === 401) {
        throw new Error("Invalid API Key (401)");
      }

      if (!response.ok) {
        throw new Error("Server Error (500)");
      }

      return response.json();
    })
    .then((data) => {
      lastCityCache[city] = data;

      displayWeather(data);
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    });
}

function displayWeather(data) {
  resultDiv.innerHTML = `<h3>${data.name}</h3>
<p>Temperature: ${data.main.temp} °C</p>
<p>Humidity: ${data.main.humidity}%</p>
<p>Condition: ${data.weather[0].description}</p>`;
}
