import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as History from 'history';

import {connectRouter, routerMiddleware} from "connected-react-router";
import {PlayersReducer} from '../players/reducers';
import {RoomReducer} from '../room/reducers';
import {GameReducer} from '../game/reducers';
import {MsgReducer} from '../msg/reducers';

export const history = History.createBrowserHistory();

const persistConfig = {
    key: "user",
    storage,
    blacklist: [ 'router' ],
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        router: connectRouter(history),
        players: PlayersReducer,
        room: RoomReducer,
        game: GameReducer,
        msg: MsgReducer
    }),
    applyMiddleware(
        routerMiddleware(history)
    )
);

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default store;