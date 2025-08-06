import { PEER_TWO_PEER_FEE } from "./constants";

class PeerTwoPeer {
  public supportedBanks: string[];
  public transactionHistory: string;
  public serviceFee: number;
  constructor() {
    this.serviceFee = PEER_TWO_PEER_FEE;
    this.transactionHistory = "";
    this.supportedBanks = [""];
  }
}
