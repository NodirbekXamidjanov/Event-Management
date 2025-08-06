import { PEER_TWO_PEER_FEE } from "./constants";
import type { Card } from "./card";
import type { Bank } from "./bank";
import type { TransactionResult } from "./types";

export class PeerTwoPeer {
  public supportedBanks: Bank[];
  public transactionHistory: TransactionResult[];
  public serviceFee: number;

  constructor() {
    this.serviceFee = PEER_TWO_PEER_FEE;
    this.transactionHistory = [];
    this.supportedBanks = [];
  }

  registerBank(bank: Bank) {
    const isAlreadyRegistered = this.supportedBanks.some(
      (existingBank) => existingBank.bankCode === bank.bankCode
    );

    if (!isAlreadyRegistered) {
      this.supportedBanks.push(bank);
      console.log(`Bank ${bank.name} has been added to P2P system`);
    } else {
      console.log(`Bank ${bank.name} is already registered`);
    }
  }

  send(fromCard: Card, toCard: Card, amount: number): TransactionResult {
    try {
      // Banklarni topish
      const fromBank = this.supportedBanks.find((bank) =>
        bank.cards.some((card) => card.cardNumber === fromCard.cardNumber)
      );
      const toBank = this.supportedBanks.find((bank) =>
        bank.cards.some((card) => card.cardNumber === toCard.cardNumber)
      );

      // Banklar qo'llab-quvvatlanadimi?
      if (!fromBank || !toBank) {
        throw new Error("One or both banks are not supported");
      }

      // Kartalar faolmi?
      if (
        fromCard.isActive === "Disactive" ||
        toCard.isActive === "Disactive"
      ) {
        throw new Error("One or both cards are blocked");
      }

      // Balans yetarli?
      const totalAmount = amount + this.calculateFee(amount);
      if (fromCard.balance < totalAmount) {
        throw new Error("Insufficient balance (including fee)");
      }

      // Limitlar tekshirish
      if (!fromCard.canSpend(totalAmount)) {
        throw new Error("Transaction limit exceeded");
      }

      // Tranzaksiyani amalga oshirish
      fromCard.balance -= totalAmount;
      toCard.balance += amount;

      const transaction: TransactionResult = {
        transactionId: this.transactionHistory.length + 1,
        transactionStatus: "SUCCES",
        from: fromCard.cardNumber,
        to: toCard.cardNumber,
      };

      this.transactionHistory.push(transaction);
      console.log("P2P transfer successful:", transaction);
      return transaction;
    } catch (error) {
      const failedTransaction: TransactionResult = {
        transactionId: this.transactionHistory.length + 1,
        transactionStatus: "FAILED",
        from: fromCard.cardNumber,
        to: toCard.cardNumber,
        transactionError: (error as Error).message,
      };

      this.transactionHistory.push(failedTransaction);
      console.log("P2P transfer failed:", failedTransaction);
      return failedTransaction;
    }
  }

  validateTransaction(fromCard: Card, toCard: Card, amount: number): boolean {
    try {
      // Banklarni topish
      const fromBank = this.supportedBanks.find((bank) =>
        bank.cards.some((card) => card.cardNumber === fromCard.cardNumber)
      );
      const toBank = this.supportedBanks.find((bank) =>
        bank.cards.some((card) => card.cardNumber === toCard.cardNumber)
      );

      // Asosiy tekshiruvlar
      if (!fromBank || !toBank) return false;
      if (fromCard.isActive === "Disactive" || toCard.isActive === "Disactive")
        return false;

      const totalAmount = amount + this.calculateFee(amount);
      if (fromCard.balance < totalAmount) return false;
      if (!fromCard.canSpend(totalAmount)) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  calculateFee(amount: number): number {
    return amount * this.serviceFee;
  }

  getTransactionHistory(): TransactionResult[] {
    return this.transactionHistory;
  }

  getSupportedBanks(): string[] {
    return this.supportedBanks.map((bank) => bank.name);
  }
}
