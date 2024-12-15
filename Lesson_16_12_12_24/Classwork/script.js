console.log("hello, objects!");

// object
// сложный тип данных
// синтаксис объекта включает фигурные скобки

// Объекты - это структура данных, состоящие из пар "ключ: значение"

// пример объекта
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

// 1. точечная нотация
console.log(user.name);

// 2. квадратные скобки
console.log(user["name"]);

console.log(user.salary);
// +'5000'    ->    5000
// 'пять тысяч'

user.salary = 5000;
console.log(user.salary);

user.age = 31;

delete user.isAdmin;
console.log(user);

// i - index (Array)
// key - ключ (Object)
// for (const key in object) {

// }

for (const key in user) {
  console.log(`Ключ: ${key}, Значение равно: ${user[key]}`);
  // console.log(`Ключ: ${key}, Значение равно: ${user.key}`);
}

user.greet = function () {
  console.log(`Привет, меня зовут ${this.name} и мне ${this.age}`);
};

user.greet();

// HW

// DEBIT CARD
// Создать объект bankAccount, который:
/* 
    1. accountNumber: "123456789"
    2. accountHolderName: "Alice"
    3. balance: 0

    4. deposit(sum) {
            // TODO Пополнение счёта
       }
    5. withdraw(sum) {
            // TODO Списание счёта
       }
    6. checkBalance() {
            // TODO Просмотр баланса счёта
       }
*/

let bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
};

// this.balance += sum
bankAccount.deposit = function(sum) {
    sum >= 5 && sum <= 5000 ? this.balance += sum : alert("Некорректная сумма пополнения") // this.balance = this.balance + sum
}

// this.balance -= sum
// Бизнес-логика
bankAccount.withdraw = function (sum) {
  sum <= this.balance && sum > 0
    ? (this.balance -= sum)
    : alert("Некорректная сумма списания");
};

// Просмотр баланса
bankAccount.checkBalance = function () {
  console.log(`Баланс Вашего аккаунта равен: ${this.balance}`);
};

// // Уведомление
// alert("Привет из модального окна");

// // Подтверждение/Отказ (Boolean)
// let answer = confirm("Вы действительно хотите закрыть страницу ?");
// console.log(answer);

// // Ответ (String | null)
// answer = prompt("Введите Ваше имя ?");
// console.log(answer);
const bank = [];

function createAccount() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();

  // falsy null, '', 0, undefined, NaN
  if (name) {
    bank.push({
      ...bankAccount,
      accountNumber: bank.length + 1,
      accountHolderName: name,
    });
    alert("Account created successfully");
  } else {
    alert("Please, enter a valid name");
  }

  nameInput.value = "";
  console.log(bank);
}

function showAccounts() {
  // HW
  const accountList = document.getElementById("accountList");

  accountList.innerHTML = "";

  // for (const account of bank) {
  //     // account.balance

  //     // const li = document.createElement('li');
  //     // li.textContent = `ID: ${account.accountNumber}, Name: ${account.accountHolderName}, Balance: ${account.balance}`;
  //     // accountList.append(li);

  //     accountList.innerHTML += `<li>ID: ${account.accountNumber}, Name: ${account.accountHolderName}, Balance: ${account.balance}</li>`;
  // }

  bank.forEach((account, index) => {
    accountList.innerHTML += `<li>${index + 1}. ID: ${
      account.accountNumber
    }, Name: ${account.accountHolderName}, Balance: ${account.balance}</li>`;
  });

  // for (let index = 0; index < bank.length; index++) {
  //     // bank[i].balance
  // }
}

// ДЕБЕТОВАЯ КАРТА (карта не уходящая в минус!)

const withdraw = document.getElementById("withdraw");
const deposit = document.getElementById("deposit");

deposit.onclick = function () {
  operation('deposit');
};

withdraw.onclick = function () {
  operation('withdraw');
};

function operation(operator) {
 // TODO (Описание действия при нажатии на кнопку deposit)
  // Ссылки на элементы
  const accountIdInput = document.getElementById("accountId");
  const amountInput = document.getElementById("amount");

  // Считывание значений, написанных в input
  // input.value - string
  // Number('0') parseInt() parseFloat() +'0' eval('10+10-5') *1
  const accountId = accountIdInput.value.trim(); // string
  const amount = +amountInput.value.trim(); // number (число или NaN)

  // isNaN() - true, если передать значение NaN и false в остальных случаях

  // let account;
  // bank.forEach(e => {
  //   if (e.accountNumber === accountId) {
  //     account = e;
  //     return;
  //   }
  // })

  // Искомый элемент или undefined
  const accountFind = bank.find(e => e.accountNumber.toString() === accountId);

  // Индекс искомого элемента или -1
  // const accountIndexFind = bank.findIndex(e => e.accountNumber.toString() === accountId);

  if(accountFind) {
    if (operator === 'deposit') {
      accountFind.deposit(amount);
    } else {
      accountFind.withdraw(amount);
    }
  } else {
    alert('Account not found');
  }

  accountIdInput.value = "";
  amountInput.value = "";
};

// DRY (Don't repeat yourself)

// const answer = prompt("Введите Ваше имя");
// if (typeof answer === "string") {
//   // String
// }
// if (answer) {
//   // String (кроме пустой строки)
// }

// function plus(a, b) {
//   calculator(5, 10, "+");
// }

// function minus() {
//   calculator(5, 10, "-");
// }

// function multiply() {
//   calculator(5, 10, "*");
// }

// function division() {
//   calculator(5, 10, "/");
// }

// function calculator(a, b, operator) {
//   if (operator === '+') {
//     return a + b;
//   }
//   if (operator === '-') {
//     return a - b;
//   }
//   if (operator === '*') {
//     return a * b;
//   }
//   if (operator === '/') {
//     return a / b;
//   }
// }

// // undefined
// console.log(calculator(5, 10, "+"));
// console.log(calculator(5, 10, "-"));
// calculator(5, 10, "*");
// calculator(5, 10, "/");

// Добавляем удаление аккаунта
// Массив для хранения информации о всех аккаунтах
let accounts = [];

// Функция для создания нового аккаунта
function createAccount() {
    const nameInput = document.getElementById('name'); // Получаем input для имени
    const name = nameInput.value.trim(); // Убираем лишние пробелы
    if (name === "") { // Проверяем, чтобы имя не было пустым
        alert("Name cannot be empty!");
        return; // Прерываем выполнение функции
    }
    // Создаём объект нового аккаунта
    const newAccount = {
        id: accounts.length + 1, // Уникальный ID (по длине массива)
        name: name, // Имя пользователя
        balance: 0 // Начальный баланс
    };
    accounts.push(newAccount); // Добавляем аккаунт в массив
    nameInput.value = ""; // Очищаем поле ввода
    alert(`Account for ${name} created with ID ${newAccount.id}`); // Уведомляем пользователя
}

// Функция для отображения всех аккаунтов в списке
function showAccounts() {
    const accountList = document.getElementById('accountList'); // Получаем элемент списка
    accountList.innerHTML = ""; // Очищаем текущий список

    // Проходим по всем аккаунтам
    accounts.forEach(account => {
        const listItem = document.createElement('li'); // Создаём новый элемент списка
        // Текст для отображения информации об аккаунте
        listItem.textContent = `ID: ${account.id}, Name: ${account.name}, Balance: ${account.balance}`;
        
        const deleteButton = document.createElement('button'); // Кнопка для удаления
        deleteButton.textContent = "Delete"; // Текст на кнопке
        deleteButton.onclick = () => deleteAccount(account.id); // Привязываем функцию удаления к кнопке
        
        listItem.appendChild(deleteButton); // Добавляем кнопку в элемент списка
        accountList.appendChild(listItem); // Добавляем элемент списка в общий список
    });
}

// Функция для удаления аккаунта по ID
function deleteAccount(id) {
    // Находим индекс аккаунта с указанным ID
    const index = accounts.findIndex(account => account.id === id);
    if (index !== -1) { // Если аккаунт найден
        accounts.splice(index, 1); // Удаляем его из массива
        alert(`Account with ID ${id} deleted.`); // Уведомляем пользователя
        showAccounts(); // Обновляем список
    } else { // Если аккаунт не найден
        alert("Account not found!");
    }
}

// Функция для обработки операций пополнения/снятия
function updateBalance(type) {
    const accountId = parseInt(document.getElementById('accountId').value); // Получаем ID аккаунта
    const amount = parseFloat(document.getElementById('amount').value); // Получаем сумму

    // Проверяем корректность введённых данных
    if (isNaN(accountId) || isNaN(amount) || amount <= 0) {
        alert("Please enter valid account ID and positive amount.");
        return; // Прерываем выполнение, если данные некорректны
    }

    // Находим аккаунт по ID
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) { // Если аккаунт не найден
        alert("Account not found!");
        return; // Прерываем выполнение
    }

    if (type === 'deposit') { // Если операция — пополнение
        account.balance += amount; // Увеличиваем баланс
        alert(`Deposited ${amount} to account ID ${accountId}. New balance: ${account.balance}`);
    } else if (type === 'withdraw') { // Если операция — снятие
        if (account.balance >= amount) { // Проверяем, хватает ли баланса
            account.balance -= amount; // Уменьшаем баланс
            alert(`Withdrew ${amount} from account ID ${accountId}. New balance: ${account.balance}`);
        } else { // Если баланса недостаточно
            alert("Insufficient balance!");
        }
    }
    showAccounts(); // Обновляем список после изменения баланса
}

// Привязываем обработчики событий к кнопкам
document.getElementById('deposit').addEventListener('click', () => updateBalance('deposit')); // Пополнение
document.getElementById('withdraw').addEventListener('click', () => updateBalance('withdraw')); // Снятие

