import * as Actions from './actions';
import initialState from '../store/initialState';

export const MsgReducer = (state = initialState.msg, action) => {
    switch(action.type) {
        case Actions.SET_LANG:
            state.lang = action.payload.lang;
            return state;
        case Actions.SET_VALID:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ERR_MSG:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ERR_MSG_VARS:
            state.errMsgVars = action.payload.errMsgVars;
            return state;
        case Actions.SET_ABL_ERR_MSG:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_T_PAGE:
            state.tPage = action.payload.tPage;
            return state;
        default:
            return state
    }
}