import { Card, CardStatus } from 'src/models/card';
import { cards as mockCards, transactions as mockTransactions } from './dummyData';

// These Service functions dont call APIs or use LocalStorage but instead
// rely on the Pinia store for state management

export const getCardList = async () => {
    return Promise.resolve(mockCards.slice(0));
};

export const addNewCard = async (card: Card, currentCards: Card[]) => {
    return Promise.resolve([card, ...currentCards]);
};

export const changeCardStatus = async (card: Card, newStatus: CardStatus, currentCards: Card[]) => {
    const updatedCards = currentCards.map((item) => {
        if (item.id === card.id) {
            item.status = newStatus;
        }
        return item;
    });
    return Promise.resolve(updatedCards);
};

export const cancelCard = async (card: Card, currentCards: Card[]) => {
    const updatedCards = currentCards.filter((item) => item.id !== card.id);
    return Promise.resolve(updatedCards);
};

export const getTransactionsList = async (cardId: number) => {
    return Promise.resolve(mockTransactions.filter((item) => cardId === item.cardId));
};
