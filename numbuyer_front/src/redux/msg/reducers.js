import * as Actions from './actions';
import initialState from '../store/initialState';

export const MsgReducer = (state = initialState.msg, action) => {
    switch(action.type) {
        case Actions.SET_LANG:
            console.log(action.payload)
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
        default:
            return state
    }
}