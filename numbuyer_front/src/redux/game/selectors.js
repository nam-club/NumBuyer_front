import { createSelector } from 'reselect';

const gameSelector = (state) => state.game;

export const getState = createSelector(
    [gameSelector],
    state => state.state
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