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
  constructor(
    public cardNumber: number,
    public expiryDate: string,
    public holderName: string,
    public cvv: number,
    public pin: number,
    public cardType: cardType
  ) {
    this.balance = 0;
    this.isActive = "Acitve";
    this.dailyLimit = DAILY_LIMIT;
    this.monthlyLimit = MONTHLY_LIMIT;
    this.transactionHistory = [];
    this.transactionId = 0;
  }

  deposit(amount: number) {
    try {
      if (!this.isActive || amount <= 0) {
        throw new Error("Card is Disactive or incorrect Amount");
      }
      this.balance += amount;
      this.transactionHistory.push({
        status: "SUCCES",
        id: this.transactionId,
        amount: amount,
        date: nowDate,
      });
      this.transactionId;
      console.log("Deposit is succesfuly");
    } catch (error) {
      console.error((error as Error).message, "Deposit is Failed");
    }
  }
  withdraw(amount: number) {
    try {
      if (
        !this.isActive ||
        this.balance <= 0 ||
        this.dailyLimit <= 0 ||
        amount <= 0
      ) {
        throw new Error("Withdrawal Error");
      }
      this.balance -= amount;
      this.transactionHistory.push({
        status: "SUCCES",
        id: this.transactionId,
        amount: amount,
        date: nowDate,
      });
      this.transactionId;
      console.log("Withdrawal is succesfuly");
    } catch (error) {
      console.error((error as Error).message, "withdraw failed");
    }
  }
  changePin(newPin: number) {
    try {
      if (newPin.toFixed().length !== 4) {
        throw new Error("The length of the pin code must be 4.");
      }
      this.pin = newPin;
      console.log("Pin updated");
    } catch (error) {
      console.error((error as Error).message, "New Pin incorrect");
    }
  }
  block() {
    this.isActive = "Disactive";
  }
  activate() {
    this.isActive = "Acitve";
  }
  canSpend(amount: number) {
    const can = this.balance - amount;
    console.log(can ? "canSpend" : "cannotSpend");
  }
}
