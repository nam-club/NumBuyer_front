import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayersAction, setCardsAction, setCoinAction, setPlayerIdAction, setOwnerAction,
     setRankingAction } from './redux/players/actions';
import { setPhaseAction, setPhaseTimesAction, setRemainingTimeAction, setTargetAction, setAuctionAction, setMessageAction,
 setAnsPlayersAction, setHighestAction, setAucBtnAction, setCalcBtnAction, setTimeAction, setGoalAction,
  setFinishGameAction, setWinPlayerAction, setTargetSkipAction, setRemTimeFlgAction, setAddedCoinAction } from './redux/game/actions';

 import { push } from 'connected-react-router';

import * as Constants from './constants';
import { setRoomAction } from './redux/room/actions';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket;

let resObj = ""; 

/* ====== 通常関数 ====== */

// 符号を表示用 or 計算用に変換する
export const changeCode = (cards, type) => {
    console.log(cards);
    if(cards) {
        switch(type) {
            case 'display':
                cards.forEach((card, index) => {
                    if(card === '*') {
                        cards[index] = '×';
                    }else if(card === '/') {
                        cards[index] = '÷';
                    }
                })
                break;
            case 'auction':
                if(cards === '*') {
                    return '×';
                }else if(cards === '/') {
                    return '÷';
                }else {
                    return cards;
                }
                break;
            case 'calculate':
                cards.forEach((card, index) => {
                    if(card === '×') {
                        cards[index] = '*';
                    }else if(card === '÷') {
                        cards[index] = '/';
                    }
                })
                break;
        }
    }
}


/* ====== リクエストAPI ====== */

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
    console.log(value);
    socket.emit('game/bid', JSON.stringify(value));
}

export const buy = function(value) {
    console.log(value);
    socket.emit('game/buy', JSON.stringify(value));
}

export const calculate = function(value) {
    changeCode(value.calculateCards, 'calculate');
    console.log(value);
    socket.emit('game/calculate', JSON.stringify(value));
}


/* ====== レスポンスAPI ====== */

export default function Socket(props) {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    //console.log(socket);

    if(!socket) {
      socket = io("http://localhost:8000/");

        socket.on('game/join', function(msg) {
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

        socket.on('game/players_info', function(msg) {
            console.log("game/playersInfo:")
            console.log(msg);
            resObj = JSON.parse(msg);
            setPlayers(resObj.players).then(()=>{
                dispatch(push('/Lobby'));
            });
        })

        socket.on('game/start', function(msg) {
            console.log("game/start:")
            console.log(msg);
            resObj = JSON.parse(msg);
            console.log(resObj);
            dispatch(setPhaseTimesAction(resObj.phaseTimes));
            dispatch(setGoalAction(resObj.goalCoin));
            nextTurn({roomId: resObj.roomId, playerId: selector.players.player.playerId});
        })

        // ゲームに必要な情報をセット
        const setGame = (object, callback) => {
            dispatch(setPlayerIdAction(object.playerId));
            dispatch(setCardsAction(object.cards));
            dispatch(setCoinAction(object.coin));
            dispatch(setTargetAction(object.targetCard));
            dispatch(setAuctionAction(object.auctionCard));
            dispatch(setPhaseAction(Constants.READY_PH));
            dispatch(setTimeAction(selector.game.phaseTimes.ready));
            callback();
        }

        // ゲーム画面に遷移
        const moveGame = () => {
            dispatch(push('/Game'));
        }
        
        socket.on('game/next_turn', function(msg) {
            console.log("game/next_turn:")
            console.log(msg);
            resObj = JSON.parse(msg);

            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');
            resObj.auctionCard = changeCode(resObj.auctionCard, 'auction');
            // ロビー画面（フェーズが始まっていない状態）の場合のみ、ゲーム画面に遷移
            if(selector.game.phase === '') {
                setGame(resObj, moveGame);
            // ゲーム中の場合は必要情報をセットのみ
            }else {
                dispatch(setCardsAction(resObj.cards));
                dispatch(setCoinAction(resObj.coin));
                dispatch(setTargetAction(resObj.targetCard));
                dispatch(setAuctionAction(resObj.auctionCard));
                dispatch(setTimeAction(selector.game.phaseTimes.ready));
            }
        })

        socket.on('game/update_state', function(msg) {
            console.log("game/update_state:")
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setPlayersAction(resObj.players));
            console.log(resObj.phase);
            dispatch(setPhaseAction(resObj.phase));
        })

        // 誰がいくら入札したかをメッセージに表示する
        socket.on('game/bid', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            if(resObj.remainingTime) {
                // 残り時間を再設定
                dispatch(setRemainingTimeAction(resObj.remainingTime));
                dispatch(setRemTimeFlgAction(true));
            }
            // 誰がいくら入札したかを表示
            dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_BID_MSG1 + resObj.coin + selector.msg.lang.AUC_BID_MSG2));
            // 最高入札額と入札者を更新
            dispatch(setHighestAction(resObj));
        })

        // 誰が何円で落札したか
        socket.on('game/buy_notify', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);

            // 全員がパスをした場合
            if(resObj.isPassAll) {
                // 誰も入札しなかったと表示
                dispatch(setMessageAction(selector.msg.lang.AUC_RESULT_MSG0));
            }else {
                // 誰がいくらで落札したかを表示
                if(selector.msg.lang.LANGUAGE === 'Chinese') {
                    dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_RESULT_MSG1 + resObj.coin
                        + selector.msg.lang.AUC_RESULT_MSG2 + resObj.auctionCard + selector.msg.lang.AUC_RESULT_MSG3));
                }else {
                    dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_RESULT_MSG1 + resObj.auctionCard
                        + selector.msg.lang.AUC_RESULT_MSG2 + resObj.coin + selector.msg.lang.AUC_RESULT_MSG3));
                }
            }
        })

        // 落札したプレイヤーのコインとカード情報を更新する
        socket.on('game/buy_update', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');

            // 最高入札額をリセット
            dispatch(setHighestAction({playerName: '', coin: 0}));
            // 返された所持コインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返された手札をセット
            dispatch(setCardsAction(resObj.cards));
            // オークションカードを非公開にする
            dispatch(setAuctionAction('　'));
            // BIDボタン、PASSボタンを押せるように戻す（パスを押した時用）
            dispatch(setAucBtnAction(true));
        })

        socket.on('game/calculate_result', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            if(resObj.isCorrectAnswer) {
                // 正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG1));
                // ANSWERボタン、PASSボタンを押せないようにする（二度回答させない）
                dispatch(setCalcBtnAction(false));
                // 獲得コインをセット（メッセージ用）
                dispatch(setAddedCoinAction(resObj.addedCoin));
            }else {
                // 不正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG0));
                // 画面更新調整用
                dispatch(setCalcBtnAction(false));
                dispatch(setCalcBtnAction(true));
            }
            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');

            // 返された所持コインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返された手札をセット
            dispatch(setCardsAction(resObj.cards));
        })

        socket.on('game/correct_players', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 返された正解者をセット
            dispatch(setAnsPlayersAction(resObj));
            // ANSWERボタン、PASSボタンを押せるように戻す（パスを押した時用）
            dispatch(setCalcBtnAction(true));
            // 正解者がいない場合はターゲットスキップフラグを立てる
            if(!resObj.existsCorrect) {
                dispatch(setTargetSkipAction(true));
            }else {
                dispatch(setTargetSkipAction(false));
            }
        })

        socket.on('game/finish_game', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setMessageAction(''));
            dispatch(setRankingAction(resObj.players));
            dispatch(setFinishGameAction(true));
        })
    }


    return (
        <CTX.Provider value={{joinQuickMatch, createMatch, joinFriendMatch, playersInfo, start, nextTurn, bid, buy, calculate}}>
            {props.children}
        </CTX.Provider>
    )
}