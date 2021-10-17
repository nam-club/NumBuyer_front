import { createSelector } from 'reselect';

const roomSelector = (state) => state.room;

export const getRoomId = createSelector(
    [roomSelector],
    state => state.roomId
)