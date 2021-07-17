import * as Actions from './actions';
import initialState from '../store/initialState';

export const TopReducer = (state = initialState.top, action) => {
    switch(action.type) {
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
        case Actions.SET_NAME:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}