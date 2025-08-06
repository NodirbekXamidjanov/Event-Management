import type { Card } from "./card";
import type { TransactionResult } from "./types";

export class Bank {
  totalBalance: number;
  transactionIdes: number;
  cards: Card[];

  constructor(
    public name: string,
    public bankCode: string,
    public transactionFee: number
  ) {
    this.totalBalance = 0;
    this.transactionIdes = 0;
    this.cards = [];
  }

  addCard(card: Card) {
    try {
      // Fix: logic teskari edi
      if (
        this.cards.some(
          (existingCard) => existingCard.cardNumber === card.cardNumber
        )
      ) {
        throw new Error("This card already added");
      }
      this.cards.push(card);
      console.log("Card added successfully");
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  getCardByNumber(cardNumber: number): Card | undefined {
    // Fix: return type qo'shildi
    try {
      const filteredCard = this.cards.find(
        (card) => card.cardNumber === cardNumber
      );
      if (!filteredCard) throw new Error("Card is not available");
      return filteredCard; // Fix: return qo'shildi
    } catch (error) {
      console.error((error as Error).message);
      return undefined;
    }
  }

  transfer(fromCard: number, toCard: number, amount: number) {
    try {
      const from = this.cards.find((card) => card.cardNumber === fromCard);
      const to = this.cards.find((card) => card.cardNumber === toCard);

      if (!from || !to) {
        throw new Error("One or both cards not found");
      }

      if (from.isActive === "Disactive" || to.isActive === "Disactive") {
        throw new Error("One or both cards are blocked");
      }

      if (from.balance < amount) {
        throw new Error("Insufficient balance");
      }

      if (!from.canSpend(amount)) {
        throw new Error("Transaction limit exceeded");
      }

      // Fix: actual transfer logic qo'shildi
      from.balance -= amount;
      to.balance += amount;

      const transaction: TransactionResult = {
        transactionId: this.transactionIdes,
        transactionStatus: "SUCCES",
        from: fromCard,
        to: toCard,
      };
      this.transactionIdes++;
      console.log("Transfer successful:", transaction);
      return transaction;
    } catch (error) {
      console.error((error as Error).message);
      const transaction: TransactionResult = {
        transactionId: this.transactionIdes,
        transactionStatus: "FAILED", // Fix: status to'g'ri
        from: fromCard,
        to: toCard,
        transactionError: (error as Error).message,
      };
      this.transactionIdes++;
      console.log("Transfer failed:", transaction);
      return transaction;
    }
  }

  calculateTotalBalance() {
    let allbalance = this.cards.reduce((sum, card) => sum + card.balance, 0);
    this.totalBalance = allbalance;
    console.log("Bank's total balance was updated:", this.totalBalance);
  }
}
