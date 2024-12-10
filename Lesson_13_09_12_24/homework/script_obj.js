const bankAccount = {
    accountNumber: "123456789",
    accountHolderName: "Alice",
    balance: 0,
    deposit(sum) {
        if (sum > 0) {
            this.balance += sum;
            console.log(`Deposit successful! New balance: ${this.balance}`);
        } else {
            console.log("Deposit amount must be greater than zero.");
        }
    },
    withdraw(sum) {
        if (sum > 0 && sum <= this.balance) {
            this.balance -= sum;
            console.log(`Withdrawal successful! New balance: ${this.balance}`);
        } else if (sum > this.balance) {
            console.log("Insufficient funds.");
        } else {
            console.log("Withdrawal amount must be greater than zero.");
        }
    },
    checkBalance() {
        console.log(`Current balance: ${this.balance}`);
    }
};


bankAccount.deposit(100);
bankAccount.withdraw(50);
bankAccount.checkBalance();

alert("Скрипт в работе");
