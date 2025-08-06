import { DAILY_LIMIT, MONTHLY_LIMIT } from "./constants";
import { nowDate } from "./get-date";
import type { cardType, Deposit, isActive } from "./types";

export class Card {
  public balance: number;
  public isActive: isActive;
  public dailyLimit: number;
  public monthlyLimit: number;
  public transactionHistory: Deposit[];
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
  }

  deposit(amount: number) {
    let id = 0;
    try {
      if (!this.isActive || amount <= 0) {
        throw new Error("Card is Disactive or incorrect Amount");
      }
      this.balance += amount;
      this.transactionHistory.push({
        status: "SUCCES",
        id: id,
        amount: amount,
        date: nowDate,
      });
      id++;
      console.log("Deposit is succesfuly");
    } catch (error) {
      console.error((error as Error).message, "Deposit is Failed");
    }
  }
  withdraw(amount: number) {
    try {
      if(!this.isActive || this.balance <= 0 || this.dailyLimit <= 0 || amount <= 0) {
        throw new  Error("")
      }
    }
  }
  changePin(newPin: number) {}
  block() {}
  activate() {}
  canSpend(amount: number) {}
}
