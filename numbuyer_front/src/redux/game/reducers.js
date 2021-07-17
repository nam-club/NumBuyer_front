import * as Actions from './actions';
import initialState from '../store/initialState';

export const GameReducer = (state = initialState.game, action) => {
    switch(action.type) {
        case Actions.SET_STATUS:
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
        case Actions.SET_ANSWER:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_AUCTION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}