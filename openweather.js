// Variable constants
// Obfuscated API Key
const _0x272649=_0x2c3d;function _0x2c3d(_0x18ad02,_0x1e7b44){const _0x53fa81=_0x53fa();return _0x2c3d=function(_0x2c3d3d,_0x4f053a){_0x2c3d3d=_0x2c3d3d-0x184;let _0x18bb86=_0x53fa81[_0x2c3d3d];return _0x18bb86;},_0x2c3d(_0x18ad02,_0x1e7b44);}(function(_0x118ae1,_0x101d12){const _0x5f34f=_0x2c3d,_0x4277a7=_0x118ae1();while(!![]){try{const _0xebccf4=parseInt(_0x5f34f(0x18b))/0x1+-parseInt(_0x5f34f(0x187))/0x2+parseInt(_0x5f34f(0x188))/0x3*(-parseInt(_0x5f34f(0x18a))/0x4)+-parseInt(_0x5f34f(0x184))/0x5*(parseInt(_0x5f34f(0x18c))/0x6)+parseInt(_0x5f34f(0x189))/0x7+parseInt(_0x5f34f(0x18d))/0x8+-parseInt(_0x5f34f(0x185))/0x9*(-parseInt(_0x5f34f(0x18e))/0xa);if(_0xebccf4===_0x101d12)break;else _0x4277a7['push'](_0x4277a7['shift']());}catch(_0x4dbecf){_0x4277a7['push'](_0x4277a7['shift']());}}}(_0x53fa,0x26163));const API_key=_0x272649(0x186);function _0x53fa(){const _0x19b3d4=['95489QGGYyj','12EHEkCd','387912KdqcAq','20MlmjWY','208855NiEmsY','810819JEnpuh','7f0dea1a52b124cc27d5e2cacc8936ca','566178Wdtgsm','87921NdrMiU','2004765JdJILz','12ZnEnMC'];_0x53fa=function(){return _0x19b3d4;};return _0x53fa();}
const country_code = 'US';
const zipAPI = `https://api.openweathermap.org/geo/1.0/zip?zip=`;
const latLongAPI = `https://api.openweathermap.org/data/2.5/weather?lat=`;
const iconAPI = `https://openweathermap.org/img/w/`;
const fiveDayAPI = `https://api.openweathermap.org/data/2.5/forecast?`;

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
        .then((response) => {
            if (!response.ok) {
                throw new Error('Bad zip code or Error Fetching Data');
            }
            return response.json();
        })
        .then((json) => {
            getWeatherData(json.lat, json.lon);
            threeDayForecast(json.lat, json.lon);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // TODO: Generate and display errors if any
            displayErrors(error);
            // Handle the error here, such as notifying the user or retrying the request
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

// Write a function that will display all the data in a visually appealing and easily
// customizable format
const displayWeatherData = (weatherData) => {
    // Get weather data container
    let weatherDataContainer = document.getElementById("weatherDataContainer");
    weatherDataContainer.innerHTML = '' // Clear former data
    displayErrors();
    // Create elements for: Current Date, City from ZIP, Temp in Farenheit, current conditions,
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
    currentDate.className = 'mb-1 d-flex justify-content-center';
    city.textContent = `City: ${weatherData.name}`;
    city.id = 'city';
    city.className = 'mb-1 d-flex justify-content-center';
    temperature.textContent = `Temperature: ${weatherData.main.temp}℉`;
    temperature.id = 'temperature';
    temperature.className = 'mb-1 d-flex justify-content-center';
    conditions.textContent = `Weather Conditions: ${weatherData.weather[0].description}`;
    conditions.id = 'conditions';
    conditions.className = 'mb-1 d-flex justify-content-center';
    tempHi.textContent = `Today's High: ${weatherData.main.temp_max}℉`;
    tempHi.id = 'tempHi';
    tempHi.className = 'mb-1 d-flex justify-content-center';
    tempLow.textContent = `Today's Low: ${weatherData.main.temp_min}℉`;
    tempLow.id = 'tempLow';
    tempLow.className = 'mb-0 d-flex justify-content-center';
    // Add and SET data ID for the weatherData.weather[0][icon] so we can utilize the visuals
    weatherIcon.src = `${iconAPI}${weatherData.weather[0].icon}.png`;
    weatherIcon.id = 'weatherIcon';
    weatherIcon.className = 'rounded mx-auto d-block';
    document.getElementById("favIcon").href = weatherIcon.src;
    // Append all data to the container
    weatherDataContainer.appendChild(weatherIcon);
    weatherDataContainer.appendChild(currentDate);
    weatherDataContainer.appendChild(city);
    weatherDataContainer.appendChild(temperature);
    weatherDataContainer.appendChild(conditions);
    weatherDataContainer.appendChild(tempHi);
    weatherDataContainer.appendChild(tempLow);
    weatherDataContainer.style.display = 'inherit';
    weatherDataContainer.className = 'justify-content-center';

    // Check the weather conditions, if it's stormy, change the background, else revert
    // Hint: If you need to find some rain use this: https://www.rainviewer.com/radars/united-states.html
    if(weatherData.weather[0].description.includes('clear')){
        if(weatherData.weather[0].icon.includes('n')){ // Check for nighttime skies variant
            weatherDataContainer.style.backgroundImage = 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmNtanF0b3RoMjN5MGFxNHVvbGpnNDBqaHExajBpcGhvY2JzNXlmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NsjutwzYUp12YP6mbh/giphy.webp)';
            weatherDataContainer.style.backgroundRepeat = 'no-repeat';
            weatherDataContainer.style.backgroundSize = 'cover';
        }
        else{
            weatherDataContainer.style.backgroundImage = 'url(https://clipart-library.com/images/6ip5qzeMT.gif)';
            weatherDataContainer.style.backgroundRepeat = 'no-repeat';
            weatherDataContainer.style.backgroundSize = 'cover';
        }
    }
    else if(weatherData.weather[0].description.includes('clouds')){
        weatherDataContainer.style.backgroundImage = 'url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)';
        weatherDataContainer.style.backgroundRepeat = 'no-repeat';
        weatherDataContainer.style.backgroundSize = 'cover';
    }
    else if(weatherData.weather[0].description.includes('thunderstorm')){
        weatherDataContainer.style.backgroundImage = 'url(https://i.pinimg.com/originals/32/0f/55/320f55b25e9580ac3c7c7825e5843dcf.gif)';
        weatherDataContainer.style.backgroundRepeat = 'no-repeat';
        weatherDataContainer.style.backgroundSize = 'cover';
    }
    else if(weatherData.weather[0].description.includes('rain')){
        weatherDataContainer.style.backgroundImage = 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3BoNnJyZjliMTgxYTFoZTBuMDgwYnBicmRwYzJlb2tlcmxhaWtpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRbNFMuFt5Zm372/giphy.webp)';
        weatherDataContainer.style.backgroundRepeat = 'no-repeat';
        weatherDataContainer.style.backgroundSize = 'cover';
    }
    else if(weatherData.weather[0].icon == '50d' || weatherData.weather[0].icon == '50n'){ // Blanket check for all weather with "mist" icon
        weatherDataContainer.style.backgroundImage = 'url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJjamg1d3Y1Znd1dWo2MWw3NmgybmoyZ2p3ZmZ1ZGF2c3djajVqcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bKPbiexNPPfk3T0vhq/giphy.webp)';
        weatherDataContainer.style.backgroundRepeat = 'no-repeat';
        weatherDataContainer.style.backgroundSize = 'cover';
    }
    else if(weatherData.weather[0].icon == '13d' || weatherData.weather[0].icon == '13n'){ // Blanket check for all weather with "snow" day and night icon
        weatherDataContainer.style.backgroundImage = 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2VtZDA0NDJ1dzVwajdsbThwaGlzOGhzMDJmaHZ6YzRiMTdyMWJ2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rRmBOCZDJJGU0/giphy.webp)';
        weatherDataContainer.style.backgroundRepeat = 'no-repeat';
        weatherDataContainer.style.backgroundSize = 'cover';
    }
    else{
        weatherDataContainer.style.backgroundImage = 'linear-gradient(to top, #0602b6, #372bc9, #5348db, #6c64ed, #857ffe)';
    }

}

// Error check display function
const displayErrors = (errors) => {
    let errorList = document.getElementById("errors");
    if(errors == undefined){
        errorList.style.display = 'none';
    }
    else{
        errorList.style.display = 'inherit';
    }
    // Clear all errors inside if any
    errorList.innerHTML = "";
    let error = document.createElement('p');
    error.textContent = errors;
    error.className = "mb-1 d-flex justify-content-center";
    errorList.appendChild(error);
}

// Write a 3 day display forecast
const threeDayForecast = (lat,long) => {
    fetch(`${fiveDayAPI}lat=${lat}&lon=${long}&appid=${API_key}&units=imperial`)
        .then((response) => response.json())
        .then((json) => {
            displayThreeDay(json)
        });
}

// 3 Day Forecast Display
const displayThreeDay = (data) => {
    // Create elements for each day including [icon, High, Low]
    for (let i = 9; i != 33; i = i + 8) {
        // Set day = element at i
        let day = document.getElementById(`day${i}`)
        // Clear former data
        day.innerHTML = ''
        // Declare Elements in loop
        let date = document.createElement('p'); // Date for forecast
        let tempHi = document.createElement('p'); // Current High
        let tempLow = document.createElement('p'); // Current Low
        let weatherIcon = document.createElement('img');
        // Add date
        let dateData = new Date(data.list[i].dt * 1000);
        date.textContent = `${dateData.toDateString()}`;
        date.id = `day${i}date`;
        date.className = `mb-1 d-flex justify-content-center`;
        // Temp Hi
        tempHi.textContent = `Hi: ${data.list[i].main.temp_max}℉`;
        tempHi.id = `day${i}High`;
        tempHi.className = `mb-1 d-flex justify-content-center`;
        // Temp Low
        tempLow.textContent = `Low: ${data.list[i].main.temp_min}℉`;
        tempLow.id = `day${i}Low`;
        tempLow.className = `mb-1 d-flex justify-content-center`;
        // Icon
        weatherIcon.src = `${iconAPI}${data.list[i].weather[0].icon}.png`; 
        weatherIcon.id = `day${i}Image`;
        weatherIcon.className = `rounded mx-auto d-block`;

        // Append items into day
        day.appendChild(weatherIcon);
        day.appendChild(date);
        day.appendChild(tempHi);
        day.appendChild(tempLow);
    }
    document.getElementById('threeDayContainer').style.display = 'flex';
}