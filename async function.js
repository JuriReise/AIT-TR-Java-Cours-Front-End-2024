async function fetchData(url) {
    try {
      // Отправка запроса
      const response = await fetch(url);
  
      // Проверка успешности запроса
      if (!response.ok) {
        throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      }
  
      // Парсинг данных в формате JSON
      const data = await response.json();
  
      // Работа с полученными данными
      console.log("Полученные данные:", data);
  
      return data; // Если нужно вернуть результат
    } catch (error) {
      // Обработка ошибок
      console.error("Ошибка при выполнении запроса:", error.message);
    }
  }
  
  // Использование функции
  fetchData("https://api.example.com/data");
  