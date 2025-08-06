import type { Card } from "./card";

class bank {
  public totalBalance: number;
  constructor(
    public name: string,
    public bankCode: string,
    public cards: Card[],
    public transactionFee: number
  ) {
    this.totalBalance = 0;
  }

  addCard(card: Card) {}
  getCardByNumber(cardNumber: number) {}
  transfer(fromCard: number, toCard: number, amount: number) {}
  calculateTotalBalance() {}
}
