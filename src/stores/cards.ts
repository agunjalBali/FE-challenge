import { defineStore } from 'pinia';
import { CardStatus, Card } from 'src/models/card';
import { Transaction } from 'src/models/transaction';
import {
  getTransactionsList,
  addNewCard,
  getCardList,
  changeCardStatus,
  cancelCard,
} from 'src/services/cardService';

type CardState = {
  cards: Card[];
  transactions: Transaction[];
};

export const useCardStore = defineStore('card', {
  state: () =>
    ({
      cards: [],
      transactions: [],
    } as CardState),

  actions: {
    async getCards() {
      const cards = await getCardList();
      this.cards = cards;
    },
    async addNewCard(card: Card) {
      const cards = await addNewCard(card, this.cards);
      this.cards = cards;
    },
    async cancelCard(card: Card) {
      const cards = await cancelCard(card, this.cards);
      this.cards = cards;
    },
    async changeCardStatus(card: Card, newStatus: CardStatus) {
      const cards = await changeCardStatus(card, newStatus, this.cards);
      this.cards = cards;
    },

    async getTransactionsList(cardId: number) {
      const transactions = await getTransactionsList(cardId);
      this.transactions = transactions;
    },
  },
});
