import React from 'react';
import { useDispatch} from 'react-redux';
import { setPlayersAction, setPlayerAction, setCardsAction, setCoinAction } from './redux/players/actions';
import { setPhaseAction, setBidAction, setSkipAction, setMessageAction, setPassAction } from './redux/game/actions';

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

    // 落札したプレイヤーのコインとカード情報を更新する
    socket.on('game/buy_update', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setCoinAction(resObj));
        dispatch(setCardsAction(resObj));
    })

    // 誰が何円で落札したか表示するために使用
    socket.on('game/buy_notify', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        dispatch(setBidAction(resObj));
        // 全員がパスしたわけじゃないよ
        dispatch(setPassAction({passFlg: false}));
    })

    socket.on('game/calculate_result', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        if(resObj.isCorrectAnswer) {
            // 正解メッセージを表示
            dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG1}));
        }else {
            // 不正解メッセージを表示
            dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG0}));
        }
        // 返されたカードをセット
        dispatch(setCardsAction(resObj));
    })

    return (
        <CTX.Provider value={{joinQuickMatch, joinFriendMatch, bid, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}