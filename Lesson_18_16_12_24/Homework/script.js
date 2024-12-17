async function getAllCharacters() {
    try {
      // 1. Делаем запрос на получение всех персонажей
      const response = await fetch('https://rickandmortyapi.com/api/character');
  
      // 2. Проверяем успешность запроса
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
  
      // 3. Преобразуем ответ в JSON
      const data = await response.json();
      const characters = data.results; // Массив персонажей
  
      // 4. Отображаем всех персонажей
      displayCharacters(characters);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  
  // Функция для отображения всех персонажей
  function displayCharacters(characters) {
    const container = document.getElementById('characters');
    
    // Перебираем массив персонажей и создаём HTML для каждого
    characters.forEach(character => {
      const characterCard = document.createElement('div');
      characterCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}" width="150">
        <h3>${character.name}</h3>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Origin:</strong> ${character.origin.name}</p>
      `;
      characterCard.style.border = "1px solid #ccc";
      characterCard.style.padding = "10px";
      characterCard.style.borderRadius = "8px";
      characterCard.style.textAlign = "center";
      characterCard.style.width = "200px";
  
      container.appendChild(characterCard);
    });
  }
  
  // Вызов функции для загрузки всех персонажей
  getAllCharacters();
  