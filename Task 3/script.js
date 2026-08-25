// =========================
// API KEY
// =========================

const API_KEY = "8a329b1cf2c81a796341358608994ede";


// =========================
// GET HTML ELEMENTS
// =========================

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");

const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");

const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");

const condition = document.getElementById("condition");

const humidity = document.getElementById("humidity");

const feelsLike = document.getElementById("feelsLike");


// =========================
// GET WEATHER
// =========================

async function getWeather() {

    const city = cityInput.value.trim();


    // Check if input is empty

    if (city === "") {

        showError("Please enter a city name.");

        return;
    }


    // Clear previous error

    errorMessage.textContent = "";

    weatherInfo.style.display = "none";


    // API URL

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


    try {

        // Fetch data from API

        const response = await fetch(url);


        // Check response

        if (!response.ok) {

            if (response.status === 404) {

                throw new Error("City not found.");

            }

            if (response.status === 401) {

                throw new Error("Invalid API key.");

            }

            throw new Error("Unable to get weather data.");

        }


        // Convert response to JSON

        const data = await response.json();


        // Display weather information

        displayWeather(data);

    }

    catch (error) {

        showError(error.message);

    }

}


// =========================
// DISPLAY WEATHER
// =========================

function displayWeather(data) {

    // City name

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;


    // Temperature

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;


    // Weather condition

    condition.textContent =
        data.weather[0].description;


    // Humidity

    humidity.textContent =
        `${data.main.humidity}%`;


    // Feels like

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;


    // Weather icon

    const iconCode = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.alt =
        data.weather[0].description;


    // Show weather card

    weatherInfo.style.display = "block";
}


// =========================
// ERROR MESSAGE
// =========================

function showError(message) {

    errorMessage.textContent = message;

    weatherInfo.style.display = "none";
}


// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click", function() {

    getWeather();

});


// =========================
// ENTER KEY
// =========================

cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        getWeather();

    }

});