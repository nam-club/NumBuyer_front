import * as Actions from './actions';
import initialState from '../store/initialState';

export const GameReducer = (state = initialState.game, action) => {
    switch(action.type) {
        case Actions.SET_PHASE:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_PHASE_TIMES:
            state.phaseTimes = action.payload.phaseTimes;
            console.log(state.phaseTimes);
            return state;
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
        case Actions.SET_GOAL:
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
        case Actions.SET_AUC_BTN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_HIGHEST:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_CALC_BTN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ANS_PLAYERS:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_FINISH_GAME:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_WIN_PLAYER:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_FIRST_TURN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_TARGET_SKIP:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}