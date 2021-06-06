import { createSelector } from 'reselect';

const roomSelector = (state) => state.room;

export const getCode = createSelector(
    [roomSelector],
    state => state.code
)