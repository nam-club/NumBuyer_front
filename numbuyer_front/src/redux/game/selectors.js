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

export const getMessages = createSelector(
    [gameSelector],
    state => state.messages
)

export const getAblMessages = createSelector(
    [gameSelector],
    state => state.ablMessages
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

export const getAuctionCards = createSelector(
    [gameSelector],
    state => state.auctionCards
)

export const getAucBtnFlg = createSelector(
    [gameSelector],
    state => state.aucBtnFlg
)

export const getHighest = createSelector(
    [gameSelector],
    state => state.highestBid
)

export const getAucResultFlg = createSelector(
    [gameSelector],
    state => state.aucResult
)

export const getHighestName = createSelector(
    [gameSelector],
    state => state.highestName
)

export const getCalcBtnFlg = createSelector(
    [gameSelector],
    state => state.calcBtnFlg
)

export const getCalcResultFlg = createSelector(
    [gameSelector],
    state => state.calcResult
)

export const getAddedCoin = createSelector(
    [gameSelector],
    state => state.addedCoin
)

export const getAnsPlayers = createSelector(
    [gameSelector],
    state => state.ansPlayers
)

export const getFiredAbilities = createSelector(
    [gameSelector],
    state => state.firedAbilities
)

export const getFinishFlg = createSelector(
    [gameSelector],
    state => state.finishFlg
)

export const getFirstTurnFlg = createSelector(
    [gameSelector],
    state => state.firstTurnFlg
)

export const getTargetSkipFlg = createSelector(
    [gameSelector],
    state => state.targetSkipFlg
)

export const getHandsUpdateFlg = createSelector(
    [gameSelector],
    state => state.handsUpdateFlg
)