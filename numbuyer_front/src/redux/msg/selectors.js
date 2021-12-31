import { createSelector } from 'reselect';

const msgSelector = (state) => state.msg;

export const getLangFlg = createSelector(
    [msgSelector],
    state => state.lang
)

export const getValidFlg = createSelector(
    [msgSelector],
    state => state.validFlg
)

export const getErrMsg = createSelector(
    [msgSelector],
    state => state.errMsg
)