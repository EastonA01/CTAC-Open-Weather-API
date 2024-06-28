// Variable constants
const API_key = '7f0dea1a52b124cc27d5e2cacc8936ca';
const country_code = 'US';
const zipAPI = `http://api.openweathermap.org/geo/1.0/zip?zip=`;
const latLongAPI = `https://api.openweathermap.org/data/2.5/weather?lat=`
const iconAPI = `http://openweathermap.org/img/w/`

// Add eventlistener for onclick of ZIPCode button to recieve weather data
document.getElementById('zipButton').addEventListener('click', function() {
    // Grab zip code from form area on button click
    let zip = document.getElementById("zipInput").value
    // Pass in the zip code to WHEREVER it needs to go
    getZipData(zip);
});

// Write a function that sends back the data regarding a ZIP code
const getZipData = (zipCode) => {
    let zipApiArgs = `${zipCode},${country_code}&appid=${API_key}` // Get Zip API Arguments
    fetch(`${zipAPI}${zipApiArgs}`)
        .then((response) => response.json())
        .then((json) => {
            getWeatherData(json.lat, json.lon); // Send long/lat to get actual weather information
        });
}
// This function actually recieves the weather data needed to be displayed
const getWeatherData = (latitude, longitude) => {
    const weatherAPIArgs = `${latitude}&lon=${longitude}&appid=${API_key}&units=imperial`;
    // Get weather data container
    let weatherDataContainer = document.getElementById("weatherDataContainer");
    const weatherData = document.createElement('p');
    weatherData.textContent = fetch(`${latLongAPI}${weatherAPIArgs}`)
        .then((response) => response.json())
        .then((json) => {
            displayWeatherData(json);
            weatherData.innerHTML = `${JSON.stringify(json)}<br>`;
        });
    weatherDataContainer.appendChild(weatherData);
}

// TODO: Write a function that will display all the data in a visually appealing and easily
// customizable format
const displayWeatherData = (weatherData) => {
    // Get weather data container
    let weatherDataContainer = document.getElementById("weatherDataContainer");
    weatherDataContainer.innerHTML = '' // Clear former data
    // TODO: Create elements for: Current Date, City from ZIP, Temp in Farenheit, current conditions,
    // and temp Hi/Lo
    let currentDate = document.createElement('p'); // Date
    let city = document.createElement('p'); // City
    let temperature = document.createElement('p'); // Temp
    let conditions = document.createElement('p'); // Current conditions
    let tempHi = document.createElement('p'); // Current High
    let tempLow = document.createElement('p'); // Current Low
    let weatherIcon = document.createElement('img')
    // Set data and id's
    currentDate.textContent = `Date: ${Date(weatherData.dt).toLocaleString()}`;
    currentDate.id = 'currentDate';
    city.textContent = `City: ${weatherData.name}`;
    city.id = 'city';
    temperature.textContent = `Temperature: ${weatherData.main.temp}`;
    temperature.id = 'temperature';
    conditions.textContent = `Weather Conditions: ${weatherData.weather[0].description}`;
    conditions.id = 'conditions';
    tempHi.textContent = `Today's High: ${weatherData.main.temp_max}`;
    tempHi.id = 'tempHi';
    tempLow.textContent = `Today's Low: ${weatherData.main.temp_min}`;
    tempLow.id = 'tempLow';
    // Add and SET data ID for the weatherData.weather[0][icon] so we can utilize the visuals
    weatherIcon.src = `${iconAPI}${weatherData.weather[0].icon}.png`
    weatherIcon.id = 'weatherIcon'
    // Make and set site favicon to the weather icon
    favIcon = document.getElementById("favIcon");
    favIcon.href = weatherIcon.src;
    // Append all data to the container
    weatherDataContainer.appendChild(currentDate);
    weatherDataContainer.appendChild(city);
    weatherDataContainer.appendChild(temperature);
    weatherDataContainer.appendChild(conditions);
    weatherDataContainer.appendChild(tempHi);
    weatherDataContainer.appendChild(tempLow);
    weatherDataContainer.appendChild(weatherIcon);

    // console.log(currentDate)
}