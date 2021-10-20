import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayersAction, setCardsAction, setCoinAction, setPlayerIdAction } from './redux/players/actions';
import { setPhaseAction, setTargetAction, setAuctionAction, setBidAction, setSkipAction, setMessageAction, setPassAction,
 setAnsPlayersAction } from './redux/game/actions';

 import { push } from 'connected-react-router';

import * as Constants from './constants';
import { setRoomAction } from './redux/room/actions';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket = io("http://localhost:8000/");

let resObj = ""; 

export const joinQuickMatch = function(value) {
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const joinFriendMatch = function(value) {
    socket.emit('join/friend_match', JSON.stringify(value));
}

export const playersInfo = function(value) {
    console.log(value);
    socket.emit('game/players_info', JSON.stringify(value));
}

export const nextTurn = function(value) {
    console.log(value);
    socket.emit('game/next_turn', JSON.stringify(value));
}

export const bid = function(value) {
    socket.emit('game/bid', value);
}

export const calculate = function(value) {
    socket.emit('game/calculate', value);
}

export default function Socket(props) {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    console.log(socket);

    socket.on('game/join', function(msg) {
        msg = '{"playerId":"1","roomId":"JUN"}';
        resObj = JSON.parse(msg);
        // プレイヤーIDをセット
        dispatch(setPlayerIdAction(resObj.playerId));
        // ルームIDをセット
        dispatch(setRoomAction(resObj.roomId));
        playersInfo({roomId: resObj.roomId, playerId: resObj.playerId});
    })

    socket.on('game/players_info', function(msg) {
        console.log(msg);
        msg = '{"players":[{"playerId":"1","playerName":"ITO","roomName":"ITO","coin":100,"cardNum":5},' +
                '{"playerId":"2","playerName":"AOKI","roomName":"ITO","coin":100,"cardNum":5}],"roomId":"JUN"}';
        resObj = JSON.parse(msg);
        dispatch(setPlayersAction(resObj.players));
        dispatch(push('/Lobby'));
    })

    // 
    socket.on('game/next_turn', function(msg) {
        msg = '{"playerId":"1","cards":["1","+","2","-","3"],"coin":100,"targetCard":"21","auctionCard":"9"}';
        resObj = JSON.parse(msg);
        dispatch(setPlayerIdAction(resObj.playerId));
        dispatch(setCardsAction(resObj.cards));
        dispatch(setCoinAction(resObj.coin));
        dispatch(setTargetAction(resObj.targetCard));
        dispatch(setAuctionAction(resObj.auctionCard));
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

    socket.on('game/correct_players', function(msg) {
        console.log(msg);
        resObj = JSON.parse(msg);
        // 返された正解者をセット
        dispatch(setAnsPlayersAction(resObj));
    })

    return (
        <CTX.Provider value={{joinQuickMatch, joinFriendMatch, playersInfo, nextTurn, bid, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}