let countries = [];
countries.push("Франция", "Германия", "Италия");
let lastCountry = countries.pop();
countries.unshift(lastCountry);
console.log(countries);
