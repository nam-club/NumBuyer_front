import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayersAction, setCardsAction, setCoinAction, setPlayerIdAction, setOwnerAction,
     setRankingAction, setResAbilityAction} from './redux/players/actions';
import { setValidAction, setErrMsgAction, setErrMsgVarsAction, setAblErrMsgAction } from './redux/msg/actions';
import { setPhaseAction, setPhaseTimesAction, setRemainingTimeAction, setTargetAction, setAuctionAction, setMessageAction,
 setAnsPlayersAction, setHighestAction, setAucBtnAction, setCalcBtnAction, setTimeAction, setGoalAction, setCalcResultAction,
  setFinishGameAction, setAucResultAction, setTargetSkipAction, setRemTimeFlgAction, setAblMessagesAction, setHandsUpdateAction, setLeaveLobbyAction } from './redux/game/actions';

 import { push } from 'connected-react-router';

import { arrayOutput, changeCode } from './logics';
import * as Constants from './constants';
import * as ConstantsMsg from './constantsMsg';
import { setRoomAction } from './redux/room/actions';
export const CTX = React.createContext();

const io = require("socket.io-client");
let socket;

let resObj = ""; 

/* ====== リクエストAPI ====== */

export const joinQuickMatch = function(value) {
    console.log("quickMatch:")
    console.log(value);
    socket.emit('join/quick_match', JSON.stringify(value));
};

export const createMatch = function(value) {
    console.log("createMatch:")
    console.log(value);
    socket.emit('create/match', JSON.stringify(value));
};

export const joinFriendMatch = function(value) {
    console.log("joinFriendMatch:")
    console.log(value);
    socket.emit('join/friend_match', JSON.stringify(value));
};

export const leaveLobby = function(value) {
    console.log("leaveLobby:")
    console.log(value);
    socket.emit('join/leave', JSON.stringify(value));
};

export const playersInfo = function(value) {
    console.log(value);
    socket.emit('game/players_info', JSON.stringify(value));
};

export const start = function(value) {
    console.log(value);
    socket.emit('game/start', JSON.stringify(value));
};

export const nextTurn = function(value) {
    console.log(value);
    socket.emit('game/next_turn', JSON.stringify(value));
};

export const bid = function(value) {
    console.log(value);
    socket.emit('game/bid', JSON.stringify(value));
};

export const buy = function(value) {
    console.log(value);
    socket.emit('game/buy', JSON.stringify(value));
};

export const calculate = function(value) {
    changeCode(value.calculateCards, 'calculate');
    console.log(value);
    socket.emit('game/calculate', JSON.stringify(value));
};

export const useAbility = function(value) {
    console.log(value);
    socket.emit('game/ready_ability', JSON.stringify(value));
};


/* ====== レスポンスAPI ====== */

export default function Socket(props) {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    if(!socket) {
      socket = io(process.env.REACT_APP_SOCKET_URL);

        socket.on('game/join', async function(msg) {
            console.log("game/join:")
            console.log(msg)
            resObj = JSON.parse(msg);

            // レスポンスエラー
            if(resObj.code) {
                // 存在しないルームコード
                if(resObj.code === Constants.NO_ROOM_ERR) {
                    dispatch(setValidAction({validFlg: true}));
                    dispatch(setErrMsgAction({errMsg: selector.msg.lang.NOT_EXIST_ROOM_ERR}));
                    dispatch(setErrMsgVarsAction([
                        ConstantsMsg.English.NOT_EXIST_ROOM_ERR,
                        ConstantsMsg.Japanese.NOT_EXIST_ROOM_ERR,
                        ConstantsMsg.Chinese.NOT_EXIST_ROOM_ERR
                    ]));
                }
            }else {
                // プレイヤーIDをセット
                dispatch(setPlayerIdAction(resObj.playerId));
                // ルームIDをセット
                dispatch(setRoomAction(resObj.roomId));
                // オーナーフラグをセット
                dispatch(setOwnerAction(resObj.isOwner));
                // アビリティをセット
                let abilities = [];
                for(let a of resObj.abilities) {
                    abilities.push(setAbility(a));
                }
                await dispatch(setResAbilityAction(abilities));
                playersInfo({roomId: resObj.roomId, playerId: resObj.playerId});
            }
        });

        // アビリティのパラメータをセット（初回）
        const setAbility = (resAbility) => {
            let ability = {
                abilityId: "",
                status: "",
                max: null,
                remaining: null,
                type: "",
                trigger: "",
                display: [],
                bgImage: null,
                selectedBgImage: null,
                tagColor: null,
            }

            // 関数の戻り値の格納オブジェクト
            let resObject = {};

            ability.abilityId = resAbility.abilityId;
            ability.status = resAbility.status;
            if(resAbility.remaining < 0) {
                ability.max = "";
                ability.remaining = "";
            }else {
                ability.max = "/" + resAbility.remaining;
                ability.remaining = resAbility.remaining;
            }
            ability.type = resAbility.type;
            ability.trigger = resAbility.trigger;

            resObject = searchAbility(resAbility.abilityId, "const");
            ability.display = resObject.display;
            ability.bgImage = resObject.bgImage;
            ability.selectedBgImage = resObject.selectedBgImage;
            ability.tagColor = resObject.tagColor;

            return ability;
        };

        // アビリティのパラメータを更新（ステータスと残り使用回数）
        const updateAbility = (resAbility) => {
            let ability = searchAbility(resAbility.abilityId, "select");
            ability.status = resAbility.status;
            if(resAbility.remaining < 0) {
                ability.remaining = "";
            }else {
                ability.remaining = resAbility.remaining;
            }
        };

        // アビリティ検索
        const searchAbility = (id, mode) => {
            let bstAbility, atkAbility, defAbility, jamAbility,  cnfAbility;

            switch(mode) {
                // 定数定義のアビリティから検索
                case "const":
                    bstAbility = Constants.BST_ABILITIES.find((a) => {return a.abilityId === id});
                    atkAbility = Constants.ATK_ABILITIES.find((a) => {return a.abilityId === id});
                    defAbility = Constants.RCV_ABILITIES.find((a) => {return a.abilityId === id});
                    jamAbility = Constants.JAM_ABILITIES.find((a) => {return a.abilityId === id});
                    cnfAbility = Constants.CNF_ABILITIES.find((a) => {return a.abilityId === id});
                    break;
                // プレイヤーが所持しているアビリティから検索
                case "select":
                    bstAbility = selector.players.player.abilities.find((a) => {return a.abilityId === id});
                    atkAbility = selector.players.player.abilities.find((a) => {return a.abilityId === id});
                    defAbility = selector.players.player.abilities.find((a) => {return a.abilityId === id});
                    jamAbility = selector.players.player.abilities.find((a) => {return a.abilityId === id});
                    cnfAbility = selector.players.player.abilities.find((a) => {return a.abilityId === id});
                    break;
                default:
                    return {}
            }

            if(bstAbility) {
                return bstAbility;
            }else if(atkAbility) {
                return atkAbility;
            }else if(defAbility) {
                return defAbility;
            }else if(jamAbility) {
                return jamAbility;
            }else if(cnfAbility) {
                return cnfAbility;
            }
        };

        const setPlayers = (value) => {
            return new Promise((resolve, reject)=>{
                dispatch(setPlayersAction(value));
                resolve();
            })
        };

        // ゲーム開始前に全プレイヤーの情報をセットし、ロビー画面に移動
        socket.on('game/players_info', function(msg) {
            console.log("game/playersInfo:");
            console.log(msg);
            resObj = JSON.parse(msg);

            setPlayers(resObj.players).then(()=>{
                if(selector.game.leaveLobbyFlg === false) {
                    // オーナーフラグを更新
                    let player = selector.players.players.find((p) => {return p.playerId === selector.players.player.playerId});
                    dispatch(setOwnerAction(player.isOwner));
                    console.log(selector.players.player);
                    dispatch(push('/Lobby'));
                    console.log("ロビー画面に移動しました");
                }else {
                    dispatch(push('/'));
                    console.log("トップ画面に移動しました");
                    dispatch(setLeaveLobbyAction(false));
                }
            });
        });

        socket.on('game/start', function(msg) {
            console.log("game/start:");
            console.log(msg);
            resObj = JSON.parse(msg);
            console.log(resObj);
            dispatch(setPhaseTimesAction(resObj.phaseTimes));
            dispatch(setGoalAction(resObj.goalCoin));
            nextTurn({roomId: resObj.roomId, playerId: selector.players.player.playerId});
        });

        // ゲームに必要な情報をセット
        const setGame = (object, callback) => {
            dispatch(setPlayerIdAction(object.playerId));
            dispatch(setCardsAction(object.cards));
            dispatch(setCoinAction(object.coin));
            dispatch(setTargetAction(object.targetCard));
            dispatch(setAuctionAction(object.auctionCards));
            dispatch(setPhaseAction(Constants.READY_PH));
            dispatch(setTimeAction(selector.game.phaseTimes.ready));
            callback();
        };

        // ゲーム画面に遷移
        const moveGame = () => {
            dispatch(push('/Game'));
        };
        
        // 次のターンに遷移
        socket.on('game/next_turn', function(msg) {
            console.log("game/next_turn:")
            console.log(msg);
            resObj = JSON.parse(msg);

            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');
            resObj.auctionCards = changeCode(resObj.auctionCards, 'auction');
            // ロビー画面（フェーズが始まっていない状態）の場合のみ、ゲーム画面に遷移
            if(selector.game.phase === '') {
                setGame(resObj, moveGame);
            // ゲーム中の場合は必要情報をセットのみ
            }else {
                dispatch(setCardsAction(resObj.cards));
                dispatch(setCoinAction(resObj.coin));
                dispatch(setTargetAction(resObj.targetCard));
                dispatch(setAuctionAction(resObj.auctionCards));
                dispatch(setTimeAction(selector.game.phaseTimes.ready));
            }
        });

        // フェーズ遷移時の情報更新
        socket.on('game/update_state', function(msg) {
            console.log("game/update_state:");
            console.log(msg);
            resObj = JSON.parse(msg);

            let ablMessages = selector.game.ablMessages;

            for(let p of resObj.players) {
                let abilities = [];
                let ablDisplay = {};
                // 発動アビリティをセット
                if(p.firedAbilities.length > 0) {
                    for(let a of p.firedAbilities) {
                        let ablMessage = {
                            type: "", // 発動アビリティタイプ
                            message: "", // 発動メッセージ
                            effect: "", // 発動アビリティ効果メッセージ
                            time: Constants.ABL_MSG_TIME, // メッセージ表示時間
                            messageImage: null, // アビリティメッセージ背景
                            tagColor: null, // アビリティメッセージ文字色
                        };
                        let resObject; // 関数の返り値格納オブジェクト

                        abilities.push(setAbility(a));
                        // アビリティメッセージをセット
                        resObject = searchAbility(a.abilityId, "const");
                        ablDisplay = resObject.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE});
                        ablMessage.type = a.type;
                        ablMessage.message = p.playerName + selector.msg.lang.FIRED_ABILITY_MSG1 +
                                            ablDisplay.name + selector.msg.lang.FIRED_ABILITY_MSG2;
                        switch(ablDisplay.fired_msg.length) {
                            case 1:
                                ablMessage.effect = ablDisplay.fired_msg[0];
                                break;
                            case 2:
                                ablMessage.effect = ablDisplay.fired_msg[0] + p.playerName + ablDisplay.fired_msg[1];
                                break;
                            default:
                                break;
                        }
                        ablMessage.messageImage = resObject.messageImage;
                        ablMessage.tagColor = resObject.tagColor;
                        ablMessages.push(ablMessage);

                        // 自分のアビリティにステータスを反映する
                        if(p.playerId === selector.players.player.playerId) {
                            let pAbilities = selector.players.player.abilities;
                            for(let pa of pAbilities) {
                                if(pa.abilityId === a.abilityId) {
                                    pa.status = a.status;
                                }
                            }
                        }
                    }
                    p.firedAbilities = abilities;
                }else {
                    p.firedAbilities.length = 0;
                }
            }

            // プレイヤー情報をstoreにセット
            dispatch(setPlayersAction(resObj.players));
            console.log("アビリティメッセージをセット");
            // アビリティメッセージをstoreにセット
            dispatch(setAblMessagesAction(ablMessages.filter((a) => a.time > 0)));
            // アビリティエラーメッセージをリセット
            dispatch(setAblErrMsgAction(""));
            console.log(resObj.phase);
            // フェーズ情報をstoreにセット
            dispatch(setPhaseAction(resObj.phase));
        });

        // 自分の手札とコインをセット（更新）
        socket.on('game/player_info', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 手札を更新
            dispatch(setHandsUpdateAction(false));
            dispatch(setCardsAction(resObj.cards));
            dispatch(setHandsUpdateAction(true));
            // コインを更新
            dispatch(setCoinAction(resObj.coin));
        });

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
        });

        // 誰が何円で落札したか
        socket.on('game/buy_notify', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);

            // 全員がパスをした場合
            if(resObj.isPassAll) {
                // 誰も入札しなかったと表示
                dispatch(setMessageAction(selector.msg.lang.AUC_RESULT_MSG0));
            }else {
                // オークションカード配列の中身を表示
                let aucMessage = arrayOutput(resObj.auctionCards);
                // 誰がいくらで落札したかを表示
                if(selector.msg.lang.LANGUAGE === 'Chinese') {
                    dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_RESULT_MSG1 + resObj.coin
                        + selector.msg.lang.AUC_RESULT_MSG2 + aucMessage + selector.msg.lang.AUC_RESULT_MSG3));
                }else {
                    dispatch(setMessageAction(resObj.playerName + selector.msg.lang.AUC_RESULT_MSG1 + aucMessage
                        + selector.msg.lang.AUC_RESULT_MSG2 + resObj.coin + selector.msg.lang.AUC_RESULT_MSG3));
                }
            }
        });

        // 落札したプレイヤーのコインとカード情報を更新する
        socket.on('game/buy_update', async function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            // 画面表示用に掛け算と割り算を変換
            changeCode(resObj.cards, 'display');

            // 落札成功アニメーション
            if(resObj.isSuccessed) {
                dispatch(setAucResultAction(Constants.SUCCESS));
            }

            // 最高入札額をリセット
            dispatch(setHighestAction({playerName: '', coin: 0}));
            // 返された所持コインをセット
            dispatch(setCoinAction(resObj.coin));
            // 返された手札をセット
            dispatch(setCardsAction(resObj.cards));
            // オークションカードを非公開にする
            dispatch(setAuctionAction([]));
            // BIDボタン、PASSボタンを押せるように戻す（パスを押した時用）
            dispatch(setAucBtnAction(true));

            // アニメーションを停止
            await setTimeout(() => {
                dispatch(setAucResultAction(Constants.NONE));
            }, 1500);
        });

        socket.on('game/calculate_result', async function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg)

            if(resObj.actionResult === Constants.CORRECT) {
                // 正解アニメーション
                dispatch(setCalcResultAction(Constants.SUCCESS));
                console.log(selector.game.calcResult);
                // 正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG1));
                // ANSWERボタン、PASSボタンを押せないようにする（二度回答させない）
                dispatch(setCalcBtnAction(false));
            }else if(resObj.actionResult === Constants.INCORRECT) {
                // 不正解アニメーション
                dispatch(setCalcResultAction(Constants.FAILED));
                console.log(selector.game.calcResult);
                // 不正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG0));
            }else if(resObj.actionResult === Constants.INC_PASS) {
                // 不正解アニメーション
                dispatch(setCalcResultAction(Constants.FAILED));
                console.log(selector.game.calcResult);
                // 不正解メッセージを表示
                dispatch(setMessageAction(selector.msg.lang.CALC_RESULT_MSG0));
                // ボタンを押せないようにする
                dispatch(setCalcBtnAction(false));
            }

            // パス状態
            if(resObj.actionResult === Constants.PASS) {
                // ボタンを押せないようにする
                dispatch(setCalcBtnAction(false));
            }else {
                await setTimeout(() => {
                    dispatch(setCalcResultAction(Constants.NONE));
                }, 1500);
                console.log(selector.game.calcResult);
                // 画面表示用に掛け算と割り算を変換
                changeCode(resObj.cards, 'display');

                // 返された所持コインをセット
                dispatch(setCoinAction(resObj.coin));
                // 返された手札をセット
                dispatch(setCardsAction(resObj.cards));
            }
        });

        socket.on('game/ready_ability', function(msg) {
            console.log("game/ready_ability:");
            console.log(msg);
            resObj = JSON.parse(msg);
            // エラーがある時
            if(resObj.code) {
                // 使用できないタイミングのエラー（リロードアビリティ）
                if(resObj.code === Constants.BAD_TIMING_RELOAD_ERR) {
                    dispatch(setAblErrMsgAction(selector.msg.lang.BAD_TIMING_ABILITY_AUC_ERR));
                // 使用できないタイミングのエラー（カタストロフィアビリティ）
                }else if(resObj.code === Constants.NOT_MEET_TURN_CATASTROPHE_ERR) {
                    dispatch(setAblErrMsgAction(selector.msg.lang.NOT_MEET_ABILITY_3TURN_ERR));
                }
            }else {
                updateAbility(resObj);
            }
        });

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
        });

        socket.on('game/finish_game', function(msg) {
            console.log(msg);
            resObj = JSON.parse(msg);
            dispatch(setMessageAction(''));
            dispatch(setRankingAction(resObj.players));
            dispatch(setFinishGameAction(true));
        });
    }


    return (
        <CTX.Provider value={{joinQuickMatch, createMatch, joinFriendMatch, playersInfo,
         start, nextTurn, bid, buy, calculate, useAbility}}>
            {props.children}
        </CTX.Provider>
    )
}