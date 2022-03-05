import { createSelector } from 'reselect';

const roomSelector = (state) => state.room;

export const getRoomId = createSelector(
    [roomSelector],
    state => state.roomId
);

export const getIsQuickMatch = createSelector(
    [roomSelector],
    state => state.isQuickMatch
);