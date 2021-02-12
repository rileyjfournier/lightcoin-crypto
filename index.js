
class Account {
  constructor() {
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (const trans of this.transactions) {
      balance += trans.value;
    }
    return balance
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.account >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log(myAccount.balance);

t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);
console.log('Balance after deposit:', myAccount.balance);
console.log(myAccount);
console.log(t1);

// t2 = new Withdrawal(50.25, myAccount);
// t2.commit();
// // console.log('Transaction 2:', t2);
// console.log('Balance after withdrawal:', myAccount.balance);


