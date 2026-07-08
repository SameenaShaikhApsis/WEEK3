const API_KEY = "abcd1234efgh5678ijkl9012mnop3456";

const cityInput = document.getElementById("city");
const weatherDiv = document.getElementById("weather");
const error = document.getElementById("error");
const loading = document.getElementById("loading");

const getWeather = async () => {

    const city = cityInput.value.trim();

    if (!city) return;

    loading.textContent = "Loading...";
    error.textContent = "";
    weatherDiv.innerHTML = "";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        loading.textContent = "";

        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
            <p>${data.weather[0].description}</p>
        `;

    } catch (err) {

        loading.textContent = "";
        error.textContent = err.message;

    }

};

document
    .getElementById("searchBtn")
    .addEventListener("click", getWeather);