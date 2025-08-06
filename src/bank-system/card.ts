import { DAILY_LIMIT, MONTHLY_LIMIT } from "./constants";
import { nowDate } from "./get-date";
import type { cardType, Deposit, isActive } from "./types";

export class Card {
  balance: number;
  isActive: isActive;
  dailyLimit: number;
  monthlyLimit: number;
  transactionHistory: Deposit[];
  transactionId: number;
  monthlySpent: number;
  cvv?: number;

  constructor(
    public cardNumber: number,
    public expiryDate: string,
    public holderName: string,
    public pin: number,
    public cardType: cardType,
    cvv?: number
  ) {
    this.balance = 0;
    this.isActive = "Active";
    this.dailyLimit = DAILY_LIMIT;
    this.monthlyLimit = MONTHLY_LIMIT;
    this.transactionHistory = [];
    this.transactionId = 0;
    this.monthlySpent = 0;
    this.cvv = 111;
  }

  deposit(amount: number) {
    try {
      if (this.isActive === "Disactive" || amount <= 0) {
        throw new Error("Card is Disactive or incorrect Amount");
      }
      this.balance += amount;
      this.transactionHistory.push({
        status: "SUCCES",
        id: this.transactionId,
        amount: amount,
        date: nowDate,
      });
      this.transactionId++; // Fix: increment transactionId
      console.log("Deposit is succesfuly");
    } catch (error) {
      console.error((error as Error).message, "Deposit is Failed");
    }
  }

  withdraw(amount: number) {
    try {
      if (
        this.isActive === "Disactive" ||
        amount <= 0 ||
        this.balance < amount ||
        amount > this.dailyLimit ||
        this.monthlySpent + amount > this.monthlyLimit
      ) {
        throw new Error(
          "Withdrawal Error: Insufficient balance or limit exceeded"
        );
      }

      this.balance -= amount;
      this.monthlySpent += amount; // Yangi qo'shildi
      this.transactionHistory.push({
        status: "SUCCES",
        id: this.transactionId,
        amount: amount,
        date: nowDate,
      });
      this.transactionId++; // Fix: increment transactionId
      console.log("Withdrawal is succesfuly");
    } catch (error) {
      console.error((error as Error).message, "withdraw failed");
    }
  }

  changePin(newPin: number) {
    try {
      if (newPin.toString().length !== 4) {
        // Fix: toString() ishlatish
        throw new Error("The length of the pin code must be 4.");
      }
      if (newPin === this.pin) {
        // Yangi qo'shildi: eski PIN bilan taqqoslash
        throw new Error("New PIN cannot be the same as old PIN");
      }
      this.pin = newPin;
      console.log("Pin updated");
    } catch (error) {
      console.error((error as Error).message, "New Pin incorrect");
    }
  }

  block() {
    if (this.isActive === "Active") {
      // Fix: assignment emas, comparison
      this.isActive = "Disactive";
    }
  }

  activate() {
    if (this.isActive === "Disactive") {
      this.isActive = "Active";
    }
  }

  canSpend(amount: number): boolean {
    // Fix: return type qo'shildi
    return (
      this.isActive === "Active" &&
      this.balance >= amount &&
      amount <= this.dailyLimit &&
      this.monthlySpent + amount <= this.monthlyLimit
    );
  }
}
