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
            return state;
        case Actions.SET_MESSAGE:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_MESSAGES:
            state.messages = action.payload;
            return state;
        case Actions.RESET_MESSAGES:
            state.messages.length = 0;
            return state;
        case Actions.SET_TIME:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_REMAINING_TIME:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_REM_TIME_FLG:
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
            state.auctionCards = action.payload;
            return state;
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
        case Actions.SET_CALC_RESULT:
            console.log(action.payload);
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ADDED_COIN:
            state.addedCoin = action.payload.addedCoin;
            return state;
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