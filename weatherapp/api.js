export async function getCurrentWeather(lat = 6.52, lng = 3.38) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m&timezone=auto`);
        if (!res.ok) {
            throw new Error('Failed to fetch Current Weather');
        }

        const data = await res.json();
        // console.log(data)
        return data
        // return {
        //     current_weather: data.current_weather,
        //     current_weather_units: data.current_weather_units
        // };

    } catch (error) {
        console.error('Error:', error.message);
        return {};
    }
}

// Using await inside async function
// (async () => {
//     const weather = await getCurrentWeather(6.335, 5.6037);
//     console.log(weather);
// })();

// getCurrentWeather(6.335, 5.6037);
// getCurrentWeather(40.7128, -74.0060);


const API_KEY = "e62260504004159030b227f7925b2c2478d126740ba5e47e208fefec29669bf8"; 

export async function getCountries(){
    try{
        const res = await fetch("https://api.countrystatecity.in/v1/countries", {
            headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if(!res.ok){
            throw new Error('failed to fetch countries');
        }
        const countries = await res.json();
        // console.log(countries);  // all countries
        // console.log(countries[0]);  // 1st countries 
        return countries
    }catch(err){
        console.log(`error: ${err.message}`);
        return {}
    }
}
// getCountries()


export async function getStates(countryCode = 'NG'){
    try{
        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
            headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if(!res.ok){
            throw new Error('failed to fetch states');
        }
        const states = await res.json();
        // console.log(states);  // all states
        // console.log(states[0]);  // 1st states
        return states 

    }catch(err){
        console.log(`error: ${err.message}`);
        return {}
    }
}
// getStates()


export async function getCities(countryCode = 'NG', stateCode = 'LA'){
    try{
        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if(!res.ok){
            throw new Error('failed to fetch states');
        }
        const cities = await res.json();
        // console.log(cities);  // all cities
        // console.log(cities[0]);  // 1st city
        return cities

    }catch(err){
        console.log(`error: ${err.message}`);
        return {}
    }
}
// getCities()


export async function getCountriesByLocation(lat = 6.52, lng = 3.38){

    try{
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`, {
            headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if(!res.ok){
            throw new Error('failed to fetch countries');
        }
        const info = await res.json();
        // console.log(info);  // all countries
        return info
    }catch(err){
        console.log(`error: ${err.message}`);
        return {}
    }
}
// getCountriesByLocation()
// getCountriesByLocation(29.5, 68)
