// Pixabay API ключ
const PIXABAY_API_KEY = '47725528-48b62ab698c0d7142d9367fa8';

// Pexels API ключ
const PEXELS_API_KEY = 'EYIALjcjssVIlaWcErEDVlszKju7PI7GN8xalyGnzUN9pPLOwWbTDVmZ';

// лоадер
function manageLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'inline-block' : 'none';
}

// общие запросы
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error.message);
        throw error;
    }
}

// Расшифровка кода погоды
function decodeWeatherCode(code) {
    const weatherCodes = {
        0: 'Ясно ☀️',
        1: 'В основном ясно 🌤️',
        2: 'Переменная облачность 🌥️',
        3: 'Пасмурно ☁️',
        45: 'Туман 🌫️',
        48: 'Осаждающий туман 🌁',
        51: 'Лёгкая морось 🌦️',
        53: 'Умеренная морось 🌧️',
        55: 'Сильная морось 🌧️',
        61: 'Лёгкий дождь 🌧️',
        63: 'Умеренный дождь 🌦️',
        65: 'Сильный дождь 🌧️',
        71: 'Лёгкий снег 🌨️',
        73: 'Умеренный снег 🌨️',
        75: 'Сильный снег ❄️',
        80: 'Лёгкий ливень 🌦️',
        81: 'Умеренный ливень 🌧️',
        82: 'Сильный ливень 🌩️',
    };

    return weatherCodes[code] || 'Неизвестная погода 🌍';
}

// Функция для получения фотографии города через Pixabay API
async function fetchCityPhotoPixabay(city) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo`);
        const data = await response.json();
        return data.hits[0]?.largeImageURL || null;
    } catch (error) {
        console.error('Ошибка при загрузке фото через Pixabay:', error.message);
        return null;
    }
}

// Функция для получения фотографии города через Pexels API
async function fetchCityPhotoPexels(city) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=1`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        const data = await response.json();
        return data.photos[0]?.src.large || null;
    } catch (error) {
        console.error('Ошибка при загрузке фото через Pexels:', error.message);
        return null;
    }
}


async function fetchCityPhoto(city) {
    try {
        let photoUrl = await fetchCityPhotoPixabay(city);
        if (!photoUrl) {
            console.log('Фото не найдено в Pixabay, пробуем Pexels...');
            photoUrl = await fetchCityPhotoPexels(city);
        }
        return photoUrl || 'placeholder-city.jpg';
    } catch (error) {
        console.error('Ошибка при загрузке фотографии города:', error.message);
        return 'placeholder-city.jpg';
    }
}


async function fetchGeoData() {
    const geoJsUrl = 'https://get.geojs.io/v1/ip/geo.json';
    const ipInfoUrl = 'https://ipinfo.io/json?token=468b0de863ad1e'; 
    manageLoader(true);

    try {
        console.log('Пробуем получить геоданные через geo.js...');
        const geoData = await fetchData(geoJsUrl);
        console.log('Геоданные через geo.js:', geoData);

        document.getElementById('geo-data').textContent = `${geoData.city}, ${geoData.country}`;
        const cityPhoto = await fetchCityPhoto(geoData.city);
        document.getElementById('city-photo').src = cityPhoto;

        const latitude = geoData.latitude;
        const longitude = geoData.longitude;
        await fetchWeatherData(latitude, longitude);
    } catch (error) {
        console.warn('Ошибка при получении данных через geo.js. Переключаемся на ipinfo.io...');
        try {
            const geoData = await fetchData(ipInfoUrl);
            console.log('Геоданные через ipinfo.io:', geoData);

            document.getElementById('geo-data').textContent = `${geoData.city}, ${geoData.country}`;
            const cityPhoto = await fetchCityPhoto(geoData.city);
            document.getElementById('city-photo').src = cityPhoto;

            const [latitude, longitude] = geoData.loc.split(',');
            await fetchWeatherData(latitude, longitude);
        } catch (finalError) {
            console.error('Ошибка при получении данных через ipinfo.io:', finalError.message);
            document.getElementById('geo-data').textContent = 'Не удалось получить данные о местоположении.';
        }
    } finally {
        manageLoader(false);
    }
}


async function fetchWeatherData(latitude = 35.6895, longitude = 139.6917) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    try {
        const weatherData = await fetchData(weatherUrl);
        const weatherCode = weatherData.current_weather.weathercode;
        const temperature = weatherData.current_weather.temperature;
        const windSpeed = weatherData.current_weather.windspeed;

        const weatherText = `
            Погода: ${decodeWeatherCode(weatherCode)}<br>
            Температура: ${temperature}°C<br>
            Скорость ветра: ${windSpeed} м/с
        `;
        document.getElementById('weather-data').innerHTML = weatherText;
    } catch (error) {
        console.error('Ошибка получения данных о погоде:', error.message);
        document.getElementById('weather-data').textContent = 'Не удалось загрузить данные о погоде.';
    }
}


function updateSeasonBackground() {
    const month = new Date().getMonth();
    const seasonPhoto = document.getElementById('season-photo');
    const seasons = ['winter.jpeg', 'spring.jpeg', 'summer.jpeg', 'autumn.jpeg'];
    const seasonIndex = [11, 0, 1].includes(month) ? 0 : [2, 3, 4].includes(month) ? 1 : [5, 6, 7].includes(month) ? 2 : 3;
    seasonPhoto.src = `../IMG/${seasons[seasonIndex]}`;
}


document.addEventListener('DOMContentLoaded', () => {
    fetchGeoData();
    updateSeasonBackground();
});
