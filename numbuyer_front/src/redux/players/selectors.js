import { createSelector } from 'reselect';

const playersSelector = (state) => state.players;

export const getPlayer = createSelector(
    [playersSelector],
    state => state.player
)

export const getPlayers = createSelector(
    [playersSelector],
    state => state.players
)

export const getId = createSelector(
    [playersSelector],
    state => state.player.playerId
)

export const getIsOwner = createSelector(
    [playersSelector],
    state => state.player.isOwner
)

export const getRanking = createSelector(
    [playersSelector],
    state => state.ranking
)