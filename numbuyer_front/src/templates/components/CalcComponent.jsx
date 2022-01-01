import React from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setCalcBtnAction, setMessageAction } from '../../redux/game/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const CalcComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [hands, setHands] = React.useState([]);
    const [calcs, setCalcs] = React.useState([]);
    const {calculate} = React.useContext(CTX);

    const transitionStyles = {
        entering: { opacity: 1, transition: 'all 1s ease' },
        entered: { opacity: 1 },
        exiting: { opacity: 0, transition: 'all 1s ease' },
        exited: { opacity: 0 },
    }

    React.useEffect(() => {
        if(selector.game.phase === Constants.GIVE_CARD_PH) {
            setFade(false);
            setFade(true);
        }
    }, [selector.game.phase]);

    React.useEffect(() => {
        setHands(selector.players.player.cards);
        if(!(selector.game.phase === Constants.CALCULATE_PH)) {
            calcs.length = 0;
        }
    }, [selector.players.player.cards]);

    // 手札から計算エリアに出すカードを選択
    const selectHands = (index, value) => {
        let errFlg = false;
        // 符号の時、calcsの末尾が符号または空だったら選択できないようにする。
        if(value === '+' || value === '-' || value === '×' || value === '÷') {
            if(calcs.length === 0) {
                errFlg = true;
            }else {
                let endCalc = calcs[calcs.length-1];
                if(endCalc === '+' || endCalc === '-' || endCalc === '×' || endCalc === '÷') {
                    errFlg = true;
                }
            }
        // 数字の時、calcsの末尾が数字だったら選択できないようにする。
        }else {
            if(calcs.length !== 0) {
                let endCalc = calcs[calcs.length-1];
                if(!(endCalc === '+' || endCalc === '-' || endCalc === '×' || endCalc === '÷')) {
                    errFlg = true;
                }
            }else {
                errFlg = false;
            }
        }
        if(!errFlg) {
            const newHands = [...hands];
            newHands.splice(index, 1);
            setHands(newHands);
            setCalcs([...calcs, value]);
            console.log(calcs);
        }
    }

    // 計算エリアから手札に戻すカードを選択
    const selectCalcs = (index, value) => {
        let firstCalc; // 計算エリアの先頭のカード
        let appendHands = []; // 手札に追加するカード配列
        const newCalcs = [...calcs];

        // 符号カードを戻す場合、一つ右の数字カードも戻す
        if(value === '+' || value === '-' || value === '×' || value === '÷') {
            appendHands.push(value);
            appendHands.push(calcs[index+1]);
            newCalcs.splice(index, 2);
        }else {
            appendHands.push(value);
            newCalcs.splice(index, 1);
        }

        firstCalc = newCalcs[0];

        // 計算エリアの先頭が符号になるようだったら符号も手札に戻す
        if(newCalcs.length >= 1) {
            if(firstCalc === '+' || firstCalc === '-' || firstCalc === '×' || firstCalc === '÷') {
                newCalcs.splice(0, 1);
                appendHands.push(firstCalc)
            }
        }
        
        setCalcs(newCalcs);
        setHands([...hands, ...appendHands]);
    }

    const ansCalc = () => {

        if(calcs.length === 0) {
            dispatch(setMessageAction(selector.msg.lang.CALC_ERR_MSG));
        }else {
            let calculateCards = calcs.slice();
            calcs.length = 0;
            calculate({roomId: selector.room.roomId, playerId: selector.players.player.playerId, calculateCards: calculateCards, action: 'answer'});
        }
    }

    const passCalc = () => {
        calcs.length = 0;
        calculate({roomId: selector.room.roomId, playerId: selector.players.player.playerId, calculateCards: null, action: 'pass'});

        // ボタン押せないようにする（パス押したらもう回答できない）
        dispatch(setCalcBtnAction(false));
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.hand + ' ' + (selector.game.phase === Constants.CALCULATE_PH ? classes.hand_animation : '')}>
                        <h3 className={classes.handMessage} align="left">My Cards</h3>
                        {(hands && !(selector.game.firstTurnFlg && (selector.game.phase === Constants.READY_PH))
                        ) &&
                            <div className={classes.card_display}>
                                {hands.map((value, index) => (
                                    <Grow in={fade} timeout={1000}>
                                        <Button variant="contained" 
                                        className={classes.card + ' ' + (selector.game.phase === Constants.CALCULATE_PH ? classes.card_valid : '')} 
                                        key={index}
                                        onClick={() => selectHands(index, value)}
                                        disabled={!(selector.game.phase == Constants.CALCULATE_PH)}>
                                            <h1 className={classes.value}>{value}</h1>
                                        </Button>
                                    </Grow>
                                ))}
                            </div>
                        }
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.calc}>
                        <h3 className={classes.calcMessage} align="left">Calculate Field</h3>
                            {calcs &&
                                <div className={classes.card_display}>
                                    {calcs.map((value, index) => (
                                        <Grow in={fade} timeout={1000}>
                                            <Button variant="contained" 
                                            className={classes.card + ' ' + (selector.game.phase === Constants.CALCULATE_PH ? classes.card_valid : '')} 
                                            key={index}
                                            onClick={() => selectCalcs(index, value)}
                                            disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                <h1 className={classes.value} >{value}</h1>
                                            </Button>
                                        </Grow>
                                    ))}
                                </div>
                            }
                        <Button size="large" variant="contained" className={classes.calcButton} onClick={() => ansCalc()}
                        disabled={!(selector.game.phase === Constants.CALCULATE_PH) || !props.calcBtnFlg}>ANSWER</Button>
                        <Button size="large" variant="contained" className={classes.passButton} onClick={() => passCalc()}
                        disabled={!(selector.game.phase === Constants.CALCULATE_PH) || !props.calcBtnFlg}>PASS</Button>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default CalcComponent;