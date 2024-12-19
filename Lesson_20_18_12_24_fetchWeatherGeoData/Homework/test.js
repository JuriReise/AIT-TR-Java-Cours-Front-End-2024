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