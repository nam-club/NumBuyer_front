import { createSelector } from 'reselect';

const msgSelector = (state) => state.msg;

export const getLang = createSelector(
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

export const getErrMsgVars = createSelector(
    [msgSelector],
    state => state.errMsgVars
)

export const getAblErrMsg = createSelector(
    [msgSelector],
    state => state.ablErrMsg
)

export const getTPage = createSelector(
    [msgSelector],
    state => state.tPage
)