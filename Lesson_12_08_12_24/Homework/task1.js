let names = ["Мария", "Алексей", "Елена", "Дмитрий"];
let ages = [22, 31, 45, 53];
let combined = names.map((name, index) => `${name} ${ages[index]} лет/годов`);
console.log(combined);
