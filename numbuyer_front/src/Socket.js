import React from 'react';
import { useDispatch} from 'react-redux';
import { setPlayersAction, setPlayerAction } from './redux/players/actions';
import { setPhaseAction, setBidAction, setSkipAction, setMessageAction } from './redux/game/actions';

import * as Constants from './constants';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket = io("http://localhost:8000/");

let resObj = ""; 

export const joinQuickMatch = function(value) {
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const joinFriendMatch = function(value) {
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const bid = function(value) {
    socket.emit('game/bid', value);
}

export const calculate = function(value) {
    socket.emit('game/calculate', value);
}

export default function Socket(props) {
    const dispatch = useDispatch();
    console.log(socket);

    socket.on('game/join', function(msg) {
        console.log(msg);
        msg = '{"playerId":1,"playerName":"ITO","roomName":"ITO","coin":100,"cards":["1","+","2","-","3"],"ownFlg":true}';
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setPlayerAction(resObj));
    })

    socket.on('game/update_state', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setPhaseAction(resObj));
        dispatch(setSkipAction({skipFlg: true}));
    })

    socket.on('game/buy', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setBidAction(resObj));
    })

    socket.on('game/calculate_result', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        if(resObj.isCorrectAnswer) {
            // 返されたカードをセット

            // 正解メッセージを表示
            dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG1}));
        }else {
            // 返されたカードをセット

            // 不正解メッセージを表示
            dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG0}));
        }
    })

    return (
        <CTX.Provider value={{joinQuickMatch, joinFriendMatch, bid, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}