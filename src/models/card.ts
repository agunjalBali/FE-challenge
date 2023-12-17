export enum CardStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface Card {
  id: number;
  cardHolder: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  status: CardStatus;
}
