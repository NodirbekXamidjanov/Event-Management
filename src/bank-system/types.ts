export type isActive = "Active" | "Disactive";
export type cardType = "VISA" | "MASTERCARD" | "HUMO" | "UZCARD";
export type transactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER" | "P2P";
export type transactionStatus = "PENDING" | "SUCCES" | "FAILED" | "CANCELLED";

export interface Transaction {
  id: number;
  type: transactionType;
  amount: number;
  date: string;
  status: transactionStatus;
  description?: string;
}

export interface TransactionResult {
  transactionStatus: transactionStatus;
  transactionId: number;
  from: number;
  to: number;
  transactionError?: string;
}

export interface Deposit {
  status: transactionStatus;
  id: number;
  amount: number;
  date: string;
}
