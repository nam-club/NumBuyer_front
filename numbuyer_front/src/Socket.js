import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayersAction, setCardsAction, setCoinAction, setPlayerIdAction, setOwnerAction } from './redux/players/actions';
import { setPhaseAction, setTargetAction, setAuctionAction, setBidAction, setSkipAction, setMessageAction, setPassAction,
 setAnsPlayersAction, setHighestAction, setTimeAction, setFinishGameAction, setWinPlayerAction } from './redux/game/actions';

 import { push } from 'connected-react-router';

import * as Constants from './constants';
import { setRoomAction } from './redux/room/actions';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket;
let count = 0;

let resObj = ""; 

export const joinQuickMatch = function(value) {
    console.log("quickMatch:")
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
}

export const createMatch = function(value) {
    console.log("createMatch:")
    console.log(value);
    socket.emit('create/match', JSON.stringify(value));
}

export const joinFriendMatch = function(value) {
    console.log("joinFriendMatch:")
    console.log(value);
    socket.emit('join/friend_match', JSON.stringify(value));
}

export const playersInfo = function(value) {
    console.log(value);
    socket.emit('game/players_info', JSON.stringify(value));
}

export const start = function(value) {
    console.log(value);
    socket.emit('game/start', JSON.stringify(value));
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
    //console.log(socket);

    if(!socket) {
      socket = io("http://localhost:8000/");
    /*if(count === 0) {
        count++;*/

        socket.once('game/join', function(msg) {
            console.log("game/join:")
            console.log(msg)
            resObj = JSON.parse(msg);
            // プレイヤーIDをセット
            dispatch(setPlayerIdAction(resObj.playerId));
            // ルームIDをセット
            dispatch(setRoomAction(resObj.roomId));
            // オーナーフラグをセット
            dispatch(setOwnerAction(resObj.isOwner));
            console.log("roomIdは" + resObj.roomId);
            console.log("playerIdは" + resObj.playerId);
            playersInfo({roomId: resObj.roomId, playerId: resObj.playerId});
        })

        const setPlayers = (value) => {
            return new Promise((resolve, reject)=>{
                dispatch(setPlayersAction(value));
                resolve();
            })
        }

        socket.once('game/players_info', function(msg) {
            console.log("game/playersInfo:")
            console.log(msg);
            resObj = JSON.parse(msg);
            setPlayers(resObj.players).then(()=>{
                dispatch(push('/Lobby'));
            });
        })

        socket.once('game/start', function(msg) {
            console.log("game/start:")
            console.log(msg);
            console.log('roomId:' + selector.room.roomId);
            nextTurn({roomId: selector.room.roomId, playerId: selector.players.player.playerId});
        })

        const setGame = (object, callback) => {
            dispatch(setPlayerIdAction(object.playerId));
            dispatch(setCardsAction(object.cards));
            dispatch(setCoinAction(object.coin));
            dispatch(setTargetAction(object.targetCard));
            dispatch(setAuctionAction(object.auctionCard));

            // mock
            /*dispatch(setPlayerIdAction(selector.players.player.playerId));
            dispatch(setCardsAction(["1","+","2","-","3"]));
            dispatch(setCoinAction(100));
            dispatch(setTargetAction("21"));
            dispatch(setAuctionAction("9"));*/

            dispatch(setPhaseAction({phase: Constants.GIVE_CARD_PH}));
            dispatch(setMessageAction({message: Constants.GIVE_CARD_MSG}));
            dispatch(setTimeAction({time: Constants.GIVE_CARD_TIME}));
            callback();
        }

        const moveGame = () => {
            dispatch(push('/Game'));
        }
        
        socket.once('game/next_turn', function(msg) {
            console.log("game/next_turn:")
            console.log(msg);
            //msg = '{"playerId":"1","cards":["1","+","2","-","3"],"coin":100,"targetCard":"21","auctionCard":"9"}';
            resObj = JSON.parse(msg);
            setGame(resObj, moveGame);
        })

        socket.once('game/update_state', function(msg) {
            console.log("game/update_state:")
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setPlayersAction(resObj.players));
            dispatch(setPhaseAction(resObj.phase));
            //dispatch(setSkipAction({skipFlg: true}));
        })

        // 誰がいくら入札したかをメッセージに表示する
        socket.once('game/bid', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setBidAction(resObj));
            dispatch(setHighestAction(resObj.coin));
        })

        // 落札したプレイヤーのコインとカード情報を更新する
        socket.once('game/buy_update', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setCoinAction(resObj));
            dispatch(setCardsAction(resObj));
        })

        // 誰が何円で落札したか表示するために使用
        socket.once('game/buy_notify', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setBidAction(resObj));
            // 最高入札額をリセット
            dispatch(setHighestAction(0));
            // 全員がパスしたわけじゃないよ
            dispatch(setPassAction({passFlg: false}));
        })

        socket.once('game/calculate_result', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            if(resObj.isCorrectAnswer) {
                // 正解メッセージを表示
                dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG1}));
            }else {
                // 不正解メッセージを表示
                dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG0}));
            }
            // 返されたコインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返されたカードをセット
            dispatch(setCardsAction(resObj.cards));
        })

        socket.once('game/correct_players', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 返された正解者をセット
            dispatch(setAnsPlayersAction(resObj));
        })

        socket.once('game/finish_game', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setWinPlayerAction(resObj.playerName));
            dispatch(setFinishGameAction(true));
        })

    //}
    }


    return (
        <CTX.Provider value={{joinQuickMatch, createMatch, joinFriendMatch, playersInfo, start, nextTurn, bid, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}