import { createSelector } from 'reselect';

const playersSelector = (state) => state;
const playerSelector = (state) => state.players;

export const getPlayers = createSelector(
    [playersSelector],
    state => state.players
)

export const getId = createSelector(
    [playerSelector],
    state => state.id
)

export const getName = createSelector(
    [playerSelector],
    state => state.name
)