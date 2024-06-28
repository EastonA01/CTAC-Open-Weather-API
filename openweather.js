// Variable constants
// Obfuscated API Key
const _0x272649=_0x2c3d;function _0x2c3d(_0x18ad02,_0x1e7b44){const _0x53fa81=_0x53fa();return _0x2c3d=function(_0x2c3d3d,_0x4f053a){_0x2c3d3d=_0x2c3d3d-0x184;let _0x18bb86=_0x53fa81[_0x2c3d3d];return _0x18bb86;},_0x2c3d(_0x18ad02,_0x1e7b44);}(function(_0x118ae1,_0x101d12){const _0x5f34f=_0x2c3d,_0x4277a7=_0x118ae1();while(!![]){try{const _0xebccf4=parseInt(_0x5f34f(0x18b))/0x1+-parseInt(_0x5f34f(0x187))/0x2+parseInt(_0x5f34f(0x188))/0x3*(-parseInt(_0x5f34f(0x18a))/0x4)+-parseInt(_0x5f34f(0x184))/0x5*(parseInt(_0x5f34f(0x18c))/0x6)+parseInt(_0x5f34f(0x189))/0x7+parseInt(_0x5f34f(0x18d))/0x8+-parseInt(_0x5f34f(0x185))/0x9*(-parseInt(_0x5f34f(0x18e))/0xa);if(_0xebccf4===_0x101d12)break;else _0x4277a7['push'](_0x4277a7['shift']());}catch(_0x4dbecf){_0x4277a7['push'](_0x4277a7['shift']());}}}(_0x53fa,0x26163));const API_key=_0x272649(0x186);function _0x53fa(){const _0x19b3d4=['95489QGGYyj','12EHEkCd','387912KdqcAq','20MlmjWY','208855NiEmsY','810819JEnpuh','7f0dea1a52b124cc27d5e2cacc8936ca','566178Wdtgsm','87921NdrMiU','2004765JdJILz','12ZnEnMC'];_0x53fa=function(){return _0x19b3d4;};return _0x53fa();}
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
            // Commented out lower function as it returns all weather object data
            // weatherData.innerHTML = `${JSON.stringify(json)}<br>`;
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
    currentDate.class = 'mb-1';
    city.textContent = `City: ${weatherData.name}`;
    city.id = 'city';
    city.class = 'mb-1';
    temperature.textContent = `Temperature: ${weatherData.main.temp}`;
    temperature.id = 'temperature';
    temperature.class = 'mb-1';
    conditions.textContent = `Weather Conditions: ${weatherData.weather[0].description}`;
    conditions.id = 'conditions';
    conditions.class = 'mb-1';
    tempHi.textContent = `Today's High: ${weatherData.main.temp_max}`;
    tempHi.id = 'tempHi';
    tempHi.class = 'mb-1';
    tempLow.textContent = `Today's Low: ${weatherData.main.temp_min}`;
    tempLow.id = 'tempLow';
    tempLow.class = 'mb-0';
    // Add and SET data ID for the weatherData.weather[0][icon] so we can utilize the visuals
    weatherIcon.src = `${iconAPI}${weatherData.weather[0].icon}.png`
    weatherIcon.id = 'weatherIcon'
    // Append all data to the container
    weatherDataContainer.appendChild(weatherIcon);
    weatherDataContainer.appendChild(currentDate);
    weatherDataContainer.appendChild(city);
    weatherDataContainer.appendChild(temperature);
    weatherDataContainer.appendChild(conditions);
    weatherDataContainer.appendChild(tempHi);
    weatherDataContainer.appendChild(tempLow);
    weatherDataContainer.style.display = 'inherit';

    // console.log(currentDate)
}