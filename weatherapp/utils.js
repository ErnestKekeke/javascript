export function getDateTime(dateString){
    try{
        const dateObj = new Date(dateString);

        const formattedDate = dateObj.toLocaleDateString(); // e.g., "3/1/2026" in US format
        const formattedTime = dateObj.toLocaleTimeString(); // e.g., "9:00:00 PM" in US format
        // console.log("Date:", formattedDate);
        // console.log("Time:", formattedTime);
        return{
            date: formattedDate,
            time: formattedTime
        }
    }catch(err){
        console.log("unable to convert datetime string");
        return {}
    }
}
// console.log("datetime", getDateTime('2026-03-01T21:00'))


export function getDirection(bearing) {
    let windDir = null;
    bearing = Math.round(bearing * 10) / 10; // Round to 1 decimal place

    if (bearing === 0) {
        windDir = 'NORTH';
    } else if (bearing > 0 && bearing <= 45) {
        windDir = `N ${bearing}° E`;
    } else if (bearing > 45 && bearing < 90) {
        let adj = 90 - bearing;
        windDir = `E ${adj}° N`;
    } else if (bearing === 90) {
        windDir = 'EAST';
    } else if (bearing > 90 && bearing < 135) {
        let adj = bearing - 90;
        windDir = `E ${adj}° S`;
    } else if (bearing >= 135 && bearing < 180) {
        let adj = 180 - bearing;
        windDir = `S ${adj}° E`;
    } else if (bearing === 180) {
        windDir = 'SOUTH';
    } else if (bearing > 180 && bearing <= 225) {
        let adj = bearing - 180;
        windDir = `S ${adj}° W`;
    } else if (bearing > 225 && bearing < 270) {
        let adj = 270 - bearing;
        windDir = `W ${adj}° S`;
    } else if (bearing === 270) {
        windDir = 'WEST';
    } else if (bearing > 270 && bearing < 315) {
        let adj = bearing - 270;
        windDir = `W ${adj}° N`;
    } else if (bearing >= 315 && bearing < 360) {
        let adj = 360 - bearing;
        windDir = `N ${adj}° W`;
    }

    return windDir;
}

// // Example usage:
// console.log(getDirection(73)); // Output: "E 17° N"
// console.log(getDirection(0));  // Output: "NORTH"
// console.log(getDirection(180));// Output: "SOUTH"


export function getWeatherDescription(code) {
    const codes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        80: 'Slight rain showers',
        95: 'Thunderstorm'
    };

    return codes[code] || 'Unknown';
}

// // Examples:
// console.log(getWeatherDescription(0));   // Clear sky
// console.log(getWeatherDescription(61));  // Slight rain
// console.log(getWeatherDescription(999)); // Unknown