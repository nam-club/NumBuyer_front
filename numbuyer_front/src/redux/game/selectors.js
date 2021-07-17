import { createSelector } from 'reselect';

const gameSelector = (state) => state.game;

export const getStatus = createSelector(
    [gameSelector],
    state => state.status
)

export const getMessage = createSelector(
    [gameSelector],
    state => state.message
)

export const getTime = createSelector(
    [gameSelector],
    state => state.time
)

export const getAnswerCard = createSelector(
    [gameSelector],
    state => state.answerCard
)

export const getAuctionCard = createSelector(
    [gameSelector],
    state => state.auctionCard
)