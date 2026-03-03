import * as api from "./api.js"; // <-- note the `* as api` syntax
import * as utils from "./utils.js"; 

// // // Using await inside async function
// // (async () => {
// //     const weather = await api.getCurrentWeather(6.335, 5.6037);
// //     console.log(weather);
// // })();


const countrySelect = document.getElementById('countrySelect');
const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');
const submitFormBtn = document.getElementById('submitFormBtn');
const locationForm = document.getElementById('locationForm');

let countryCode = 'NG'  // Nigeria
let stateCode = 'LA' // Lagos
const NO_SELECTION = "<option value=''>No Selection</option>";
const STATES_INITIAL = "<option value=''>All States</option>";
const CITIES_INITIAL = "<option value=''>All Cities</option>";

countrySelect.addEventListener('change', ()=>{
    submitFormBtn.disabled = true
    // console.log(countrySelect.value);
    stateSelect.disabled = true;
    citySelect.disabled = true;
    stateSelect.innerHTML = NO_SELECTION
    citySelect.innerHTML = NO_SELECTION
    //........
    if(countrySelect.value){
        const country = JSON.parse(countrySelect.value)
        // console.log(country);
        countryCode = country.iso2
        console.log(countryCode)
        populateStates(countryCode)
        console.log('new state selected')
        stateSelect.disabled = false
    }
})

stateSelect.addEventListener('change', ()=>{
    submitFormBtn.disabled = true
    citySelect.disabled = true;
    citySelect.innerHTML = NO_SELECTION
    //........
    if(stateSelect.value){
        const state = JSON.parse(stateSelect.value)
        stateCode = state.iso2
        console.log(stateCode)
        populateCities(countryCode, stateCode)
        console.log('new cities is selected')
        citySelect.disabled = false;
    }
})

citySelect.addEventListener('change', ()=>{
    submitFormBtn.disabled = true
    if(citySelect.value){
        submitFormBtn.disabled = false
        console.log("New City is Selected")
    }
})

populateCountries() // call countries 
async function populateCountries() {
    submitFormBtn.disabled = true
    stateSelect.disabled = true;
    citySelect.disabled = true;
    stateSelect.innerHTML = NO_SELECTION
    citySelect.innerHTML = NO_SELECTION
    //...........
    const countries = await api.getCountries();
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = JSON.stringify(country)
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}

async function populateStates(countryCode) {    
    // stateSelect.innerHTML = ''; // Clear previous states
    stateSelect.innerHTML = STATES_INITIAL // Clear previous states
    const states = await api.getStates(countryCode);
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = JSON.stringify(state);
        option.textContent = state.name;
        stateSelect.appendChild(option);
    });
}

async function populateCities(countryCode, stateCode) {    
    // citySelect.innerHTML = ''; // Clear previous cities
    citySelect.innerHTML = CITIES_INITIAL  // Clear previous cities
    const cities = await api.getCities(countryCode, stateCode);
    cities.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = JSON.stringify(city)
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}



locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!citySelect.value) return;
    const country = JSON.parse(countrySelect.value)
    const state = JSON.parse(stateSelect.value)
    const city = JSON.parse(citySelect.value)

    console.log(country)
    console.log(state)
    console.log(city)

    defaultLat = Number(city.latitude);
    defaultLng = Number(city.longitude);
    console.log('Auto update STOP !!!');
    window.clearInterval(autoUpdateId);
    btnStartAutoUpdate.value = 'start';
    btnStartAutoUpdate.innerHTML = 'Start Auto Update';
    btnStartAutoUpdate.style.backgroundColor = 'green';

    updateMapLocation(Number(city.latitude), Number(city.longitude))

    try {
        // const weather = await api.getCurrentWeather(city.latitude, city.longitude);
        // console.log(weather);
        await updateHtml(city.latitude, city.longitude)
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
});


//.................................................. update html
async function updateHtml(latitude, longitude) {
    console.log('weather')
    const weather = await api.getCurrentWeather(latitude, longitude);
    console.log(weather);

    console.log('info')
    const info = await api.getCountriesByLocation(latitude, longitude)
    console.log(info)

    // --- Weather Info ---
    const tempValue = document.getElementById("temp-value");
    const windSpeed = document.getElementById("wind-speed");
    const windDirection = document.getElementById("wind-direction");
    const weatherDesc = document.getElementById("weather-desc");
    const elevationValue = document.getElementById("elevation-value");
    const dayStatus = document.getElementById("day-status");

    tempValue.innerHTML = weather.current_weather.temperature + weather.current_weather_units.temperature
    windSpeed.innerHTML = weather.current_weather.windspeed + weather.current_weather_units.windspeed
    windDirection.innerHTML = utils.getDirection(Number(weather.current_weather.winddirection))
    weatherDesc.innerHTML = utils.getWeatherDescription(Number(weather.current_weather.weathercode))
    elevationValue.innerHTML = weather.elevation
    dayStatus.innerHTML = Number(weather.current_weather.is_day) ? "Day" : "Night";

    // --- Location Info ---
    const latitudeEl = document.getElementById("latitude");
    const longitudeEl = document.getElementById("longitude");
    const cityName = document.getElementById("city-name");
    const localityName = document.getElementById("locality-name");
    const stateName = document.getElementById("state-name");
    const stateCode = document.getElementById("state-code");
    const countryName = document.getElementById("country-name");
    const countryCode = document.getElementById("country-code");
    const continentName = document.getElementById("continent-name");
    const continentCode = document.getElementById("continent-code");

    latitudeEl.innerHTML = info.latitude.toFixed(2)
    longitudeEl.innerHTML = info.longitude.toFixed(2)
    cityName.innerHTML = info.city
    localityName.innerHTML = info.locality
    stateName.innerHTML = info.principalSubdivision
    stateCode.innerHTML = info.principalSubdivisionCode
    countryName.innerHTML = info.countryName
    countryCode.innerHTML = info.countryCode
    continentName.innerHTML = info.continent
    continentCode.innerHTML = info.continentCode  

    // --- Update Info ---
    const updateTime = document.getElementById("update-time");
    const updateDate = document.getElementById("update-date");
    const timezoneValue = document.getElementById("timezone-value");

    const datetime = utils.getDateTime(weather.current_weather.time)
    updateTime.innerHTML = datetime.time
    updateDate.innerHTML = datetime.date
    timezoneValue.innerHTML = weather.timezone + " " + weather.timezone_abbreviation
}


//.................................................. Auto update 
const btnStartAutoUpdate = document.getElementById('btnStartAutoUpdate');
let autoUpdateId = 0
let defaultLat = 6.52
let defaultLng = 3.38

btnStartAutoUpdate.addEventListener('click', function () {

    if (this.value === 'start') {
        // Start auto update
        console.log('Auto update START !!!')
        updateHtml(defaultLat, defaultLng);

        autoUpdateId = window.setInterval(function () {
            updateHtml(defaultLat, defaultLng);
        }, 180000);
        this.value = 'stop';
        this.value = 'running';
        this.innerHTML = 'Stop Auto Update';
        this.style.backgroundColor = 'red';

    } else {
        // Stop auto update
        console.log('Auto update STOP !!!')
        window.clearInterval(autoUpdateId);

        this.value = 'start';
        this.innerHTML = 'Start Auto Update';
        this.style.backgroundColor = 'green';
    }

});





//........................................................... map
// Global variables
let map;
let marker;

// Function to update map location
function updateMapLocation(latitude, longitude) {

    submitFormBtn.disabled = true

    defaultLat = latitude;
    defaultLng = longitude;
    console.log('Auto update STOP !!!');
    window.clearInterval(autoUpdateId);
    btnStartAutoUpdate.value = 'start';
    btnStartAutoUpdate.innerHTML = 'Start Auto Update';
    btnStartAutoUpdate.style.backgroundColor = 'green';

    
    const location = { lat: latitude, lng: longitude };

    marker.setPosition(location);   // Move marker
    map.setCenter(location);        // Center map
}

// Window load map
window.addEventListener("load", () => {

    // Make sure Google Maps API finished loading
    if (!window.google) {
        console.error("Google Maps failed to load.");
        return;
    }

    // Initial coordinates (default starting position)
    const initialLocation = { lat: 6.52, lng: 3.38 };
    updateHtml(6.52, 3.38);

    // Create the map and attach it to the #map div
    // This runs only once when the page loads
    map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 10,                  // Initial zoom level
            center: initialLocation,   // Center map at starting location
        }
    );

    // Create a marker at the initial location
    // This marker will later be moved when user clicks
    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
    });

    // When user clicks anywhere on the map (optional)
    map.addListener("click", async (event) => {

        // Get clicked latitude and longitude
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Call function to update marker position + map center
        updateMapLocation(lat, lng);

        // Log new coordinates in console
        console.log("Updated:", lat, lng);


        // Example: call API with updated coordinates
        try {
            // const weather = await api.getCurrentWeather(city.latitude, city.longitude);
            // console.log(weather);
            await updateHtml(lat, lng)
        } catch (err) {
            console.error("Weather API failed:", err);
        }

        
    });

});



// theme, only for HTML Theme update
// below can be remove during debugging 
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    // 1. Toggle the class on the body
    const isDark = document.body.classList.toggle('dark-theme');
    
    // 2. Update the button text based on the current mode
    if (isDark) {
        themeToggle.innerHTML = "☀️ Light Mode";
        // Optional: change button style for dark mode
        themeToggle.style.borderColor = "#4dabf7";
    } else {
        themeToggle.innerHTML = "🌙 Dark Mode";
        themeToggle.style.borderColor = "#333";
    }
    
    // 3. (Optional) Save preference to local storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Check for saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = "☀️ Light Mode";
}