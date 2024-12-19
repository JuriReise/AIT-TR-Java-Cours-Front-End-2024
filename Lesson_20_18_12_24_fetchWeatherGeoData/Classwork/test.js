// Pixabay API ключ
const PIXABAY_API_KEY = '47725528-48b62ab698c0d7142d9367fa8';

// Pexels API ключ
const PEXELS_API_KEY = 'EYIALjcjssVIlaWcErEDVlszKju7PI7GN8xalyGnzUN9pPLOwWbTDVmZ';

// Управление лоадером
function manageLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'inline-block' : 'none';
}

// Общая функция для выполнения запросов
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
        const response = await fetch(https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo);
        const data = await response.json();
        return data.hits[0]?.largeImageURL || null; // Возвращаем null, если фото не найдено
    } catch (error) {
        console.error('Ошибка при загрузке фото через Pixabay:', error.message);
        return null; // Если произошла ошибка, возвращаем null
    }
}

// Функция для получения фотографии города через Pexels API
async function fetchCityPhotoPexels(city) {
    try {
        const response = await fetch(https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=1, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        const data = await response.json();
        return data.photos[0]?.src.large || null; // Возвращаем null, если фото не найдено
    } catch (error) {
        console.error('Ошибка при загрузке фото через Pexels:', error.message);
        return null; // Если произошла ошибка, возвращаем null
    }
}

// Функция для получения фотографии города
async function fetchCityPhoto(city) {
    try {
        let photoUrl = await fetchCityPhotoPixabay(city); // Сначала через Pixabay
        if (!photoUrl) {
            console.log('Фото не найдено в Pixabay, пробуем Pexels...');
            photoUrl = await fetchCityPhotoPexels(city); // Затем через Pexels
        }
        return photoUrl || 'placeholder-city.jpg'; // Если фото не найдено, возвращаем заглушку
    } catch (error) {
        console.error('Ошибка при загрузке фотографии города:', error.message);
        return 'placeholder-city.jpg'; // Если произошла ошибка, возвращаем заглушку
    }
}

// Фон по сезонам
function updateSeasonBackground() {
    const month = new Date().getMonth();
    const seasonPhoto = document.getElementById('season-photo');
    let seasonImage = '';

    if ([11, 0, 1].includes(month)) {
        seasonImage = 'winter.jpeg';
    } else if ([2, 3, 4].includes(month)) {
        seasonImage = 'spring.jpeg';
    } else if ([5, 6, 7].includes(month)) {
        seasonImage = 'summer.jpeg';
    } else if ([8, 9, 10].includes(month)) {
        seasonImage = 'autumn.jpeg';
    }

    seasonPhoto.src = ../IMG/${seasonImage};
}

// Получение геоданных
async function fetchGeoData() {
    const geoUrl = 'https://cors-anywhere.herokuapp.com/https://get.geojs.io/v1/ip/geo.json';
    manageLoader(true);
    try {
        const geoData = await fetchData(geoUrl);
        document.getElementById('geo-data').textContent = ${geoData.city}, ${geoData.country};
        const cityPhoto = await fetchCityPhoto(geoData.city);
        document.getElementById('city-photo').src = cityPhoto;
    } catch (error) {
        console.error('Ошибка получения геоданных:', error.message);
    } finally {
        manageLoader(false);
    }
}


// Получение данных о погоде
async function fetchWeatherData() {
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true';
    manageLoader(true);
    try {
        const weatherData = await fetchData(weatherUrl);
        const weatherCode = weatherData.current_weather.weathercode;
        const temperature = weatherData.current_weather.temperature;
        const windSpeed = weatherData.current_weather.windspeed;

        // Обновление данных о погоде в DOM
        const weatherText = 
            Погода: ${decodeWeatherCode(weatherCode)}<br>
            Температура: ${temperature}°C<br>
            Скорость ветра: ${windSpeed} м/с
        ;
        document.getElementById('weather-data').innerHTML = weatherText;
    } catch (error) {
        console.error('Ошибка получения данных о погоде:', error.message);
        document.getElementById('weather-data').textContent = 'Не удалось загрузить данные о погоде.';
    } finally {
        manageLoader(false);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    fetchGeoData();
    fetchWeatherData();
    updateSeasonBackground();
});

// Тест фотографий для разных городов
async function testCityPhotos() {
    const testCities = ['Paris', 'Tokyo', 'New York', 'Sydney', 'Moscow'];
    console.log('--- Тест фотографий городов ---');
    for (const city of testCities) {
        const photoUrl = await fetchCityPhoto(city);
        console.log(Город: ${city}, Фото URL: ${photoUrl});
    }
}

// Тест изменения местоположения
function testGeoLocation() {
    const mockGeoData = [
        { city: 'London', country: 'United Kingdom' },
        { city: 'Berlin', country: 'Germany' },
        { city: 'Madrid', country: 'Spain' }
    ];

    console.log('--- Тест изменения местоположения ---');
    for (const geo of mockGeoData) {
        document.getElementById('geo-data').textContent = ${geo.city}, ${geo.country};
        console.log(Местоположение: ${geo.city}, ${geo.country});
    }
}

// Тест данных о погоде
async function testWeatherData() {
    const testCoordinates = [
        { latitude: 48.8566, longitude: 2.3522, city: 'Paris' },
        { latitude: 35.6895, longitude: 139.6917, city: 'Tokyo' },
        { latitude: 40.7128, longitude: -74.0060, city: 'New York' }
    ];

    console.log('--- Тест данных о погоде ---');
    for (const coord of testCoordinates) {
        const weatherUrl = https://api.open-meteo.com/v1/forecast?latitude=${coord.latitude}&longitude=${coord.longitude}&current_weather=true;
        const weatherData = await fetchData(weatherUrl);
        console.log(Погода для ${coord.city}:, weatherData.current_weather);
    }
}

// Запуск всех тестов
document.addEventListener('DOMContentLoaded', async () => {
    console.log('=== Начало тестирования ===');
    await testCityPhotos();
    testGeoLocation();
    await testWeatherData();
    console.log('=== Тестирование завершено ===');
});