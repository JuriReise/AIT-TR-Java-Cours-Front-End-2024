// геоданные
async function fetchGeoData() {
    const geoUrl = 'https://get.geojs.io/v1/ip/geo.json';
    const geoDataElement = document.getElementById('geo-data');

    try {
        
        const geoResponse = await axios.get(geoUrl);
        const { latitude, longitude, city } = geoResponse.data;

        
        geoDataElement.innerHTML = `
            <p>Широта: ${latitude}</p>
            <p>Долгота: ${longitude}</p>
            <p>Город: ${city}</p>
        `;

        
        await fetchWeatherData(latitude, longitude, city);
    } catch (error) {
        console.error('Ошибка при получении геоданных:', error.message);
        geoDataElement.textContent = 'Не удалось загрузить данные о вашем местоположении.';
    }
}

// погода
async function fetchWeatherData(latitude, longitude, city) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&precipitation_probability=true`;
    const weatherDataElement = document.getElementById('weather-data');

    try {
        
        const weatherResponse = await axios.get(weatherUrl);
        const { temperature, windspeed, weathercode } = weatherResponse.data.current_weather;
        const precipitationProbability = weatherResponse.data.precipitation_probability || "Данных нет";

        
        const weatherDescription = decodeWeatherCode(weathercode);

        
        weatherDataElement.innerHTML = `
            <h2>Погода в городе ${city}</h2>
            <p>Температура: ${temperature}°C</p>
            <p>Скорость ветра: ${windspeed} м/с</p>
            <p>Вероятность осадков: ${precipitationProbability}%</p>
            <p>Погода: ${weatherDescription}</p>
        `;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error.message);
        weatherDataElement.textContent = 'Не удалось загрузить данные о погоде.';
    }
}

// виды погоды
function decodeWeatherCode(code) {
    const weatherCodes = {
        0: 'Ясно',
        1: 'В основном ясно',
        2: 'Переменная облачность',
        3: 'Пасмурно',
        45: 'Туман',
        48: 'Осаждающий туман',
        51: 'Лёгкая морось',
        53: 'Умеренная морось',
        55: 'Сильная морось',
        61: 'Лёгкий дождь',
        63: 'Умеренный дождь',
        65: 'Сильный дождь',
        71: 'Лёгкий снег',
        73: 'Умеренный снег',
        75: 'Сильный снег',
        80: 'Лёгкий ливень',
        81: 'Умеренный ливень',
        82: 'Сильный ливень',
    };

    return weatherCodes[code] || 'Неизвестная погода';
}


fetchGeoData();
