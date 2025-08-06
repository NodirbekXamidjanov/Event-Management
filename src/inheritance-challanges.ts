class User {
	name: string;
	phone: string;
	balance: number;

	constructor(name: string, phone: string, balance: number) {
		this.name = name;
		this.phone = phone;
		this.balance = balance;
	}

	getInfo() {
		return `Name: ${this.name}, Phone: ${this.phone}, Balance: ${this.balance}`;
	}

	addMoney(amount: number) {
		this.balance += amount;
		return this.balance;
	}
}

type Status = "PENDING" | "COMPLETED" | "FAILED";

class Payment {
	from: User;
	to: User;
	amount: number;
	status: Status;

	constructor(from: User, to: User, amount: number) {
		this.from = from;
		this.to = to;
		this.amount = amount;
		this.status = "PENDING";
	}

	send() {
		if (this.from.balance >= this.amount) {
			this.from.addMoney(-this.amount);
			this.to.addMoney(this.amount);
			this.status = "COMPLETED";
			return true;
		} else {
			this.status = "FAILED";
			return false;
		}
	}

	getDetails() {
		return `From: ${this.from.name}, To: ${this.to.name}, Amount: ${this.amount}, Status: ${this.status}, From Balance: ${this.from.balance}, To Balance: ${this.to.balance}`;
	}
}

class Bank {
  name: string;
  users: User[];
  payments: Payment[];

  constructor(name: string) {
	this.name = name;
	this.users = [];
	this.payments = [];
}

addUser(...users: User[]) {
	return this.users.push(...users);
}
processPayment(payment: Payment) {
	const isSended = payment.send();
	this.payments.push(payment);
	const message = isSended ? 'Successfully payment' : 'Failed payment';

	return message;
};

}

const user1 = new User("Kent", "+998998961348", 10000);
const user2 = new User("Mark", "+998991234567", 20000);

console.log(user1.getInfo());
console.log(user2.getInfo());

const payment1 = new Payment(user1, user2, 5000);
const payment2 = new Payment(user2, user1, 6000);

console.log(payment1.getDetails());
console.log(payment2.getDetails());

const bank = new Bank("IMAN INVEST");
bank.addUser(user1, user2);

bank.processPayment(payment1);
bank.processPayment(payment2);

console.log(payment1.getDetails());
console.log(payment2.getDetails());

console.log(user1.getInfo());
console.log(user2.getInfo());