import * as Actions from './actions';
import initialState from '../store/initialState';

export const PlayersReducer = (state = initialState.players, action) => {
    switch(action.type) {
        case Actions.SET_PLAYER:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_PLAYERS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}