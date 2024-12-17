document.getElementById("fetchButton").addEventListener("click", () => {
    const characterId = document.getElementById("characterId").value;
  
    if (!characterId) {
      alert("Please enter a Character ID");
      return;
    }
  
    const apiUrl = `https://rickandmortyapi.com/api/character/${characterId}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Character not found");
        }
        return response.json();
      })
      .then(data => {
        displayCharacter(data);
      })
      .catch(error => {
        alert(error.message);
      });
  });
  
  function displayCharacter(character) {
    const characterInfo = document.getElementById("characterInfo");
    characterInfo.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Origin:</strong> ${character.origin.name}</p>
    `;
    characterInfo.style.display = "block";
  }
  
  
  