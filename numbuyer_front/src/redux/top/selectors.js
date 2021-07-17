import { createSelector } from 'reselect';

const topSelector = (state) => state.top;

export const getValidFlg = createSelector(
    [topSelector],
    state => state.validFlg
)

export const getErrMsg = createSelector(
    [topSelector],
    state => state.errMsg
)

export const getName = createSelector(
    [topSelector],
    state => state.name
)