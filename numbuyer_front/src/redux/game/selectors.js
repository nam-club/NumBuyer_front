import { createSelector } from 'reselect';

const gameSelector = (state) => state.game;

export const getPhase = createSelector(
    [gameSelector],
    state => state.phase
)

export const getPhaseTimes = createSelector(
    [gameSelector],
    state => state.phaseTimes
)

export const getMessage = createSelector(
    [gameSelector],
    state => state.message
)

export const getTime = createSelector(
    [gameSelector],
    state => state.time
)

export const getRemainingTime = createSelector(
    [gameSelector],
    state => state.remainingTime
)

export const getRemTimeFlg = createSelector(
    [gameSelector],
    state => state.remTimeFlg
)

export const getGoalCoin = createSelector(
    [gameSelector],
    state => state.goalCoin
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

export const getAddedCoin = createSelector(
    [gameSelector],
    state => state.addedCoin
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

export const getFirstTurnFlg = createSelector(
    [gameSelector],
    state => state.firstTurnFlg
)

export const getTargetSkipFlg = createSelector(
    [gameSelector],
    state => state.targetSkipFlg
)