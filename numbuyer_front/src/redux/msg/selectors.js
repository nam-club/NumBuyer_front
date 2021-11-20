import { createSelector } from 'reselect';

const msgSelector = (state) => state.msg;

export const getValidFlg = createSelector(
    [msgSelector],
    state => state.validFlg
)

export const getErrMsg = createSelector(
    [msgSelector],
    state => state.errMsg
)