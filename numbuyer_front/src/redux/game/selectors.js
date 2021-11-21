import { createSelector } from 'reselect';

const gameSelector = (state) => state.game;

export const getPhase = createSelector(
    [gameSelector],
    state => state.phase
)

export const getMessage = createSelector(
    [gameSelector],
    state => state.message
)

export const getTime = createSelector(
    [gameSelector],
    state => state.time
)

export const getTargetCard = createSelector(
    [gameSelector],
    state => state.targetCard
)

export const getAuctionCard = createSelector(
    [gameSelector],
    state => state.auctionCard
)

export const getAucBtnFlg = createSelector(
    [gameSelector],
    state => state.aucBtnFlg
)

export const getHighest = createSelector(
    [gameSelector],
    state => state.highestBid
)

export const getHighestName = createSelector(
    [gameSelector],
    state => state.highestName
)

export const getCalcBtnFlg = createSelector(
    [gameSelector],
    state => state.calcBtnFlg
)

export const getAnsPlayers = createSelector(
    [gameSelector],
    state => state.ansPlayers
)

export const getFinishFlg = createSelector(
    [gameSelector],
    state => state.finishFlg
)

export const getWinPlayer = createSelector(
    [gameSelector],
    state => state.winPlayerName
)