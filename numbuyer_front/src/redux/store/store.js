import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import {connectRouter, routerMiddleware} from "connected-react-router";
import {PlayersReducer} from '../players/reducers';
import {RoomReducer} from '../room/reducers';
import {GameReducer} from '../game/reducers';
import {TopReducer} from '../top/reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            players: PlayersReducer,
            room: RoomReducer,
            game: GameReducer,
            top: TopReducer
        }),
        applyMiddleware(
            routerMiddleware(history)
        )
    )
}