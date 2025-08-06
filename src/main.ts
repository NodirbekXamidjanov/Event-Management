import "./bank-system/index";
import { Bank, Card, PeerTwoPeer } from "./bank-system/index";

const bank1 = new Bank("Xalq Banki", "XB", 0.6);
const bank2 = new Bank("Ipoteka Banki", "IB", 0.4);

const card1 = new Card(1234567891245789, "12/25", "Kent.C Dots", 1234, "HUMO");
const card2 = new Card(
  9875482195798493,
  "22/36",
  "Michael Corleone",
  4444,
  "MASTERCARD",
  333
);

const p2p = new PeerTwoPeer()

p2p.registerBank(bank1)
p2p.registerBank(bank2)
