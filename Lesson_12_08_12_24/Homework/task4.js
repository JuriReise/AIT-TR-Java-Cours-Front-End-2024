let numbers = [1, 2, 3, 4, 5];

// Умножить каждый элемент на 2
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i] * 2);
}

// Новый массив с квадратами элементов
let squaredNumbers = numbers.map(num => num ** 2);
console.log("Исходный массив:", numbers);
console.log("Массив квадратов:", squaredNumbers);
