class BankAccount {
    constructor(accountNumber, accountHolderName) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = 0;
    }

    deposit(sum) {
        if (sum > 0) {
            this.balance += sum;
            console.log(`Deposit successful! New balance: ${this.balance}`);
        } else {
            console.log("Deposit amount must be greater than zero.");
        }
    }

    withdraw(sum) {
        if (sum > 0 && sum <= this.balance) {
            this.balance -= sum;
            console.log(`Withdrawal successful! New balance: ${this.balance}`);
        } else if (sum > this.balance) {
            console.log("Insufficient funds.");
        } else {
            console.log("Withdrawal amount must be greater than zero.");
        }
    }

    checkBalance() {
        console.log(`Current balance: ${this.balance}`);
    }
}

// Пример использования
const aliceAccount = new BankAccount("123456789", "Alice");
aliceAccount.deposit(200);
aliceAccount.withdraw(100);
aliceAccount.checkBalance();
// Класс: Удобен для создания множества экземпляров с одинаковым поведением.
alert("Скрипт в работе");
