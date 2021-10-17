import * as Actions from './actions';
import initialState from '../store/initialState';

export const GameReducer = (state = initialState.game, action) => {
    switch(action.type) {
        case Actions.SET_PHASE:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_MESSAGE:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_TIME:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_TARGET:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_AUCTION:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_BID:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_SKIP:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_PASS:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ANS_PLAYERS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}