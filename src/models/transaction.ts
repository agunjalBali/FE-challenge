export enum TransactionType {
  Charged = 'charged',
  Refund = 'refund',
}

export enum TransactionClass {
  seasonal = 'seasonal',
  regular = 'regular',
  important = 'important',
}

export interface Transaction {
  recipientName: string;
  id: number;
  amount: number;
  currency: string;
  type: TransactionType;
  transactionTime: Date;
  cardId: number;
  category: TransactionClass;
}
