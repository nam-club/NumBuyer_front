import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setMessageAction, setPhaseAction, setTimeAction, setSkipAction, setPassAction,
setFinishGameAction, setWinPlayerAction } from '../../redux/game/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';

const TimeComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { nextTurn } = React.useContext(CTX);

    const [gameData, setGameData] = usePersist("gameData", null);

    const [time, setTime] = React.useState(selector.game.time);
    const [targetCard, setTargetCard] = React.useState(selector.game.targetCard);
    const [auctionCard, setAuctionCard] = React.useState(selector.game.auctionCard);
    const [showFlg, setShowFlg] = React.useState(false);

    let aucCoin = 100;
    let player = 'Player1';

    React.useEffect(() => {
        const interval = setInterval(() => {
            setGameData(selector);
            setTime(t => {
                if(t<=0) {
                    return 0;
                }/*else if(selector.game.skipFlg) {
                    return 0;
                }*/
                return t-1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    React.useEffect(() => {
        console.log("phase:" + selector.game.phase);
        console.log("time:" + time);
        /*if(selector.game.phase !== prePhase) {*/
            switch(selector.game.phase) {
                case Constants.READY_PH:
                    if(time === 0) {
                        dispatch(setPhaseAction({phase: Constants.GIVE_CARD_PH}));
                        dispatch(setMessageAction({message: Constants.GIVE_CARD_MSG}));
                        dispatch(setTimeAction({time: Constants.GIVE_CARD_TIME}));
                        setTime(Constants.GIVE_CARD_TIME);
                    }
                    break;
                case Constants.GIVE_CARD_PH:
                    if(time === 0) {
                        dispatch(setPhaseAction({phase: Constants.SHOW_ANS_PH}));
                        dispatch(setMessageAction({message: (Constants.SHOW_ANS_MSG + '"' + targetCard + '"')}));
                        dispatch(setTimeAction({time: Constants.SHOW_ANS_TIME}));
                        setTime(Constants.SHOW_ANS_TIME);
                        props.setTargetCard(targetCard);
                    }
                    break;
                case Constants.SHOW_ANS_PH:
                    if(time === 0) {
                        dispatch(setPhaseAction({phase: Constants.SHOW_AUC_PH}));
                        dispatch(setMessageAction({message: ('"' + auctionCard + '"' + Constants.SHOW_AUC_MSG)}));
                        dispatch(setTimeAction({time: Constants.SHOW_AUC_TIME}));
                        setTime(Constants.SHOW_AUC_TIME);
                        props.setAuctionCard(auctionCard);
                    }
                    break;
                case Constants.SHOW_AUC_PH:
                    //dispatch(setPhaseAction({phase: Constants.AUCTION_PH}));
                    if(time === 0) {
                        dispatch(setPhaseAction({phase: Constants.AUCTION_PH}));
                        dispatch(setMessageAction({message: (Constants.AUCTION_MSG1 + props.auctionCard + Constants.AUCTION_MSG2)}));
                        dispatch(setTimeAction({time: Constants.AUCTION_TIME}));
                        setTime(Constants.AUCTION_TIME);
                        setShowFlg(true);
                    }
                    break;
                case Constants.AUCTION_PH:
                    //dispatch(setPhaseAction({phase: Constants.AUC_RESULT_PH}));
                    // フェーズがスキップされた　かつ　全員がパスしたとき
                    if(selector.game.skipFlg && selector.game.passFlg) {
                        dispatch(setMessageAction({message: Constants.AUC_RESULT_MSG0}));
                    }else {
                        dispatch(setMessageAction({message: (player + Constants.AUC_RESULT_MSG1 + auctionCard +
                        Constants.AUC_RESULT_MSG2 + aucCoin + Constants.AUC_RESULT_MSG3)}));
                    }
                    dispatch(setTimeAction({time: Constants.AUC_RESULT_TIME}));
                    dispatch(setSkipAction({skipFlg: false}));
                    dispatch(setPassAction({passFlg: true}));
                    setTime(Constants.AUC_RESULT_TIME);
                    setShowFlg(false);
                    props.setAuctionCard('　');
                    break;
                case Constants.AUC_RESULT_PH:
                    //dispatch(setPhaseAction({phase: Constants.CALCULATE_PH}));
                    dispatch(setMessageAction({message: (Constants.CALCULATE_MSG1 + targetCard + Constants.CALCULATE_MSG2)}));
                    dispatch(setTimeAction({time: Constants.CALCULATE_TIME}));
                    setTime(Constants.CALCULATE_TIME);
                    setShowFlg(true);
                    break;
                case Constants.CALCULATE_PH:
                    //dispatch(setPhaseAction({phase: Constants.CALC_RESULT_PH}));
                    if(selector.game.ansPlayers.length == 0) {
                        dispatch(setMessageAction({message: Constants.CALC_FINISH_MSG0}));
                    }else {
                        let ansMessage = Constants.CALC_FINISH_MSG1;
                        let loopNum = 1;

                        for(let ansPlayer of selector.game.asnPlayers) {
                            if(loopNum != selector.game.ansPlayers.length) {
                                ansMessage += ansPlayer + ', ';
                            }else {
                                ansMessage += ansPlayer;
                            }
                            loopNum++
                        }

                        ansMessage += Constants.CALC_FINISH_MSG2;
                        ansMessage += targetCard + Constants.CALC_FINISH_MSG3;
                        dispatch(setMessageAction({message: ansMessage}));

                        // ターゲットカードを消す
                        props.setTargetCard(" ");
                    }
                    dispatch(setTimeAction({time: Constants.CALC_RESULT_TIME}));
                    setTime(Constants.CALC_RESULT_TIME);
                    break;
                case Constants.CALC_RESULT_PH:
                    //dispatch(setPhaseAction({phase: Constants.READY_PH}));
                    nextTurn({roomId: props.roomId, playerId: props.playerId});
                    // mock
                    dispatch(setWinPlayerAction('aoki'));
                    dispatch(setFinishGameAction(true));
                    break;
                default:
                    break;
            }
        //}
    }, [selector.game.phase, time]);

    return (
        <Card className={classes.time}>
            <h3 className={classes.tag}>Time</h3>
            <h1 className={classes.message}>{showFlg ? time : "　"}</h1>
        </Card>
    )
}

export default TimeComponent;