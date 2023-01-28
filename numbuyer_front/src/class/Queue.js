export class Queue {
    constructor(playerId) {
        this.queue = {playerId: playerId, fluctParams: []};
    }

    enqueue(fluctParam) {
        this.queue.fluctParams.push(fluctParam);
    }

    dequeue() {
        return this.queue.fluctParams.shift();
    }

    peek() {
        return this.queue.fluctParams[0];
    }
}