import React from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setCalcBtnAction, setMessageAction } from '../../redux/game/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { AreaTag, CalcArea, CardValue, TermCard, CalcButton, ConfirmTitle, ConfirmMessage, PassButton, YesButton, useStyles, WrapDisplay } from '../theme';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CalcComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [hands, setHands] = React.useState([]);
    const [calcs, setCalcs] = React.useState([]);
    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ
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
        handleClose();
        calcs.length = 0;
        calculate({roomId: selector.room.roomId, playerId: selector.players.player.playerId, calculateCards: null, action: 'pass'});

        // ボタン押せないようにする（パス押したらもう回答できない）
        dispatch(setCalcBtnAction(false));
    }

    // ダイアログ表示
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // ダイアログ閉じる
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.hand + ' ' + (selector.game.phase === Constants.CALCULATE_PH ? classes.hand_animation : '')}>
                        <AreaTag align="left">{selector.msg.lang.YOUR_CARDS}</AreaTag>
                        {(hands && !(selector.game.firstTurnFlg && (selector.game.phase === Constants.READY_PH))
                        ) &&
                            <WrapDisplay>
                                {hands.map((value, index) => (
                                    <Grow in={fade} timeout={1000}>
                                        <TermCard variant="contained" 
                                        key={index}
                                        onClick={() => selectHands(index, value)}
                                        disabled={!(selector.game.phase == Constants.CALCULATE_PH)}>
                                            <CardValue>{value}</CardValue>
                                        </TermCard>
                                    </Grow>
                                ))}
                            </WrapDisplay>
                        }
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <CalcArea>
                        <AreaTag align="left">{selector.msg.lang.CALCULATE_FIELD}</AreaTag>
                            {calcs &&
                                <WrapDisplay>
                                    {calcs.map((value, index) => (
                                        <Grow in={fade} timeout={1000}>
                                            <TermCard variant="contained" 
                                            key={index}
                                            onClick={() => selectCalcs(index, value)}
                                            disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                <CardValue>{value}</CardValue>
                                            </TermCard>
                                        </Grow>
                                    ))}
                                </WrapDisplay>
                            }
                        <PassButton size="large" variant="contained" onClick={handleClickOpen}
                            disabled={!(selector.game.phase === Constants.CALCULATE_PH) || !props.calcBtnFlg}>
                            {selector.msg.lang.PASS_BTN}</PassButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <ConfirmTitle id="alert-dialog-title">{selector.msg.lang.PASS_TITLE}</ConfirmTitle>
                            <DialogContent>
                                <ConfirmMessage id="alert-dialog-description">{selector.msg.lang.PASS_MSG}</ConfirmMessage>
                            </DialogContent>
                            <DialogActions>
                                <PassButton onClick={handleClose}>{selector.msg.lang.NO_BTN}</PassButton>
                                <YesButton onClick={passCalc} autoFocus>{selector.msg.lang.YES_BTN}</YesButton>
                            </DialogActions>
                        </Dialog>
                        <CalcButton size="large" variant="contained" onClick={ansCalc}
                        disabled={!(selector.game.phase === Constants.CALCULATE_PH) || !props.calcBtnFlg}>
                            {selector.msg.lang.ANSWER_BTN}</CalcButton>
                    </CalcArea>
                </Grid>
            </Grid>
        </div>
    )
}

export default CalcComponent;