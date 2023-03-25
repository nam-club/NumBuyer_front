export class Queue {
    constructor(playerId) {
        this.queue = {playerId: playerId, fluctCards: [], fluctCoins: []};
    }

    enqueueCards(fluctCard) {
        this.queue.fluctCards.push(fluctCard);
    }

    enqueueCoins(fluctCoin) {
        this.queue.fluctCoins.push(fluctCoin);
    }

    dequeueCards() {
        return this.queue.fluctCards.shift();
    }

    dequeueCoins() {
        return this.queue.fluctCoins.shift();
    }

    peek() {
        return this.queue.fluctParams[0];
    }
}