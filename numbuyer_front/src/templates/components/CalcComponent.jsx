import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setMessageAction } from '../../redux/game/actions';
import { setPreCardsAction } from '../../redux/players/actions';

import * as Constants from '../../constants';

import { AreaTag, CalcArea, CardValue, TermCard, NewTermCard, CalcButton, ConfirmTitle, ConfirmMessage, PassButton, YesButton, useStyles, WrapDisplay } from '../theme';
import { AreaTagMobile, WrapCardMobile, TermCardMobile, NewTermCardMobile, CalcAreaMobile } from '../themeMobile';

import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grow from '@mui/material/Grow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useMediaQuery } from "@mui/material";

const CalcComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const matches = useMediaQuery("(min-width:520px)");

    const [fade, setFade] = React.useState(false); // フェードイン用フラグ
    const [hands, setHands] = React.useState([]);
    const [hands1, setHands1] = React.useState([]);
    const [hands2, setHands2] = React.useState([]);
    const [calcs, setCalcs] = React.useState([]);
    const [open, setOpen] = React.useState(false); // ダイアログ用フラグ
    const { calculate } = React.useContext(CTX);
    const [tab, setTab] = React.useState(false);

    React.useEffect(() => {
        if (selector.game.phase === Constants.GIVE_CARD_PH) {
            setFade(false);
            setFade(true);
        }
        if (selector.game.phase !== Constants.CALCULATE_PH) {
            setCalcs([]);
        }
    }, [selector.game.phase]);

    React.useEffect(() => {
        console.log("手札が更新されてるよ");
        let reserveHands = []; // 手札に加えるための準備用配列
        console.time('手札差分チェック');
        for(let card of selector.players.player.cards) {
            if((selector.game.turn === 1) && ((selector.game.phase === Constants.READY_PH) || (selector.game.phase === Constants.GIVE_CARD_PH))) {
                reserveHands.push({id: card.id, value: card.value, newFlg: false});
            }else {
                if(selector.players.player.preCards.find((preCard) => {return preCard.id === card.id})) {
                    reserveHands.push({id: card.id, value: card.value, newFlg: false});
                }else {
                    reserveHands.push({id: card.id, value: card.value, newFlg: true});
                }
            }
        }
        console.timeEnd('手札差分チェック');
        console.log(reserveHands);
        setHands(reserveHands);
        let middle = Math.floor(reserveHands.length / 2);
        setHands1(reserveHands.slice(0, middle));
        setHands2(reserveHands.slice(middle));
        dispatch(setPreCardsAction(selector.players.player.cards));
    }, [selector.players.player.cards]);

    // 手札から計算エリアに出すカードを選択
    const selectHands = (index, card) => {
        let errFlg = false;
        // 符号の時、calcsの末尾が符号または空だったら選択できないようにする。
        if (card.value === '+' || card.value === '-' || card.value === '×' || card.value === '÷') {
            if (calcs.length === 0) {
                errFlg = true;
            } else {
                let endCalc = calcs[calcs.length - 1];
                if (endCalc.value === '+' || endCalc.value === '-' || endCalc.value === '×' || endCalc.value === '÷') {
                    errFlg = true;
                }
            }
            // 数字の時、calcsの末尾が数字だったら選択できないようにする。
        } else {
            if (calcs.length !== 0) {
                let endCalc = calcs[calcs.length - 1];
                if (!(endCalc.value === '+' || endCalc.value === '-' || endCalc.value === '×' || endCalc.value === '÷')) {
                    errFlg = true;
                }
            } else {
                errFlg = false;
            }
        }
        if (!errFlg) {
            const newHands = [...hands];
            newHands.splice(index, 1);
            setHands(newHands);
            let middle = Math.floor(newHands.length / 2);
            setHands1(newHands.slice(0, middle));
            setHands2(newHands.slice(middle));
            setCalcs([...calcs, card]);
        }
    }

    // 計算エリアから手札に戻すカードを選択
    const selectCalcs = (index, card) => {
        let firstCalc; // 計算エリアの先頭のカード
        let appendHands = []; // 手札に追加するカード配列
        const newCalcs = [...calcs];

        console.log("===============");
        console.log(card);
        // 符号カードを戻す場合、一つ右の数字カードも戻す
        if (card.value === '+' || card.value === '-' || card.value === '×' || card.value === '÷') {
            appendHands.push(card);
            appendHands.push(calcs[index + 1]);
            newCalcs.splice(index, 2);
        } else {
            appendHands.push(card);
            newCalcs.splice(index, 1);
        }

        firstCalc = newCalcs[0];

        // 計算エリアの先頭が符号になるようだったら符号も手札に戻す
        if (newCalcs.length >= 1) {
            if (firstCalc.value === '+' || firstCalc.value === '-' || firstCalc.value === '×' || firstCalc.value === '÷') {
                newCalcs.splice(0, 1);
                appendHands.push(firstCalc)
            }
        }

        setCalcs(newCalcs);
        let newHands = [...hands, ...appendHands]
        setHands(newHands);
        let middle = Math.floor(newHands.length / 2);
        setHands1(newHands.slice(0, middle));
        setHands2(newHands.slice(middle));
    }

    const ansCalc = () => {
        let endCalc = calcs[calcs.length - 1];
        // 計算に使うカードを何も選択されていない
        if (calcs.length === 0) {
            dispatch(setMessageAction(selector.msg.lang.CALC_ERR_MSG1));
        // 最後が符号カードで終わっている
        } else if ((endCalc === '+' || endCalc === '-' || endCalc === '×' || endCalc === '÷')) {
            dispatch(setMessageAction(selector.msg.lang.CALC_ERR_MSG2));
        // 問題なし
        } else {
            let calculateCards = calcs.slice();
            calcs.length = 0;
            dispatch(setPreCardsAction(selector.players.player.cards));
            // カード配列からIDのみを取り出す
            let cardIds = [];
            for(let card of calculateCards) {
                cardIds.push(card.id);
            }
            calculate({ roomId: selector.room.roomId, playerId: selector.players.player.playerId, calculateCardIds: cardIds, action: 'answer' });
        }
    }

    const passCalc = () => {
        handleClose();
        calcs.length = 0;
        calculate({ roomId: selector.room.roomId, playerId: selector.players.player.playerId, calculateCards: null, action: 'pass' });
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
            {matches ?
                <div>
                    <Card
                        className={classes.hand + ' ' + ((selector.game.phase === Constants.CALCULATE_PH) && selector.game.handsUpdateFlg ? classes.hand_animation : '')}>
                        <AreaTag align="left">{selector.msg.lang.YOUR_CARDS}</AreaTag>
                        {(hands && !(selector.game.firstTurnFlg && (selector.game.phase === Constants.READY_PH))
                        ) &&
                            <WrapDisplay>
                                {hands.map((value, index) => (
                                    <Grow in={fade} timeout={1000} key={index}>
                                        {(selector.game.phase === Constants.CALCULATE_PH) || (!value.newFlg) ?
                                            <TermCard variant="contained"
                                                onClick={() => selectHands(index, value)}
                                                disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                <CardValue>{value.value}</CardValue>
                                            </TermCard>
                                        :
                                            <NewTermCard variant="contained"
                                                onClick={() => {
                                                    if(selector.game.phase === Constants.CALCULATE_PH) {
                                                        selectHands(index, value)
                                                    }
                                                }}>
                                                <CardValue>{value.value}</CardValue>
                                            </NewTermCard>
                                        }
                                    </Grow>
                                ))}
                            </WrapDisplay>
                        }
                    </Card>
                    <CalcArea>
                        <AreaTag align="left">{selector.msg.lang.CALCULATE_FIELD}</AreaTag>
                        {calcs &&
                            <WrapDisplay>
                                {calcs.map((value, index) => (
                                    <Grow in={fade} timeout={1000} key={index}>
                                        {(selector.game.phase === Constants.CALCULATE_PH) || (!value.newFlg) ?
                                            <TermCard variant="contained"
                                                onClick={() => selectCalcs(index, value)}
                                                disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                <CardValue>{value.value}</CardValue>
                                            </TermCard>
                                        :
                                            <NewTermCard variant="contained"
                                                onClick={() => selectCalcs(index, value)}
                                                disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                <CardValue>{value.value}</CardValue>
                                            </NewTermCard>
                                        }
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
                </div>
                :
                <div>
                    <Card
                        className={classes.hand + ' ' + ((selector.game.phase === Constants.CALCULATE_PH) && selector.game.handsUpdateFlg ? classes.hand_animation : '')}
                        sx={{ margin: '0 1%', padding: '1%' }}>
                        <AreaTagMobile align="left">{selector.msg.lang.YOUR_CARDS}</AreaTagMobile>
                        {(hands && !(selector.game.firstTurnFlg && (selector.game.phase === Constants.READY_PH))
                        ) &&
                            <>
                            <WrapCardMobile>
                                <Tabs
                                    value={tab}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile>
                                    {hands1.map((value, index) => (
                                        <Grow in={fade} timeout={1000} key={index}>
                                            {(selector.game.phase === Constants.CALCULATE_PH) || (!value.newFlg) ?
                                                <TermCardMobile variant="contained"
                                                    onClick={() => selectHands(index, value)}
                                                    disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                    <CardValue>{value.value}</CardValue>
                                                </TermCardMobile>
                                            :
                                                <NewTermCardMobile variant="contained"
                                                    onClick={() => {
                                                        if(selector.game.phase === Constants.CALCULATE_PH) {
                                                            selectHands(index, value)
                                                        }
                                                    }}>
                                                    <CardValue>{value.value}</CardValue>
                                                </NewTermCardMobile>
                                            }
                                        </Grow>
                                    ))}
                                </Tabs>
                            </WrapCardMobile>
                            <WrapCardMobile>
                                <Tabs
                                    value={tab}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile>
                                    {hands2.map((value, index) => (
                                        <Grow in={fade} timeout={1000} key={index}>
                                            {(selector.game.phase === Constants.CALCULATE_PH) || (!value.newFlg) ?
                                                <TermCardMobile variant="contained"
                                                    onClick={() => selectHands(index+Math.floor(hands1.length), value)}
                                                    disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                    <CardValue>{value.value}</CardValue>
                                                </TermCardMobile>
                                            :
                                                <NewTermCardMobile variant="contained"
                                                    onClick={() => {
                                                        if(selector.game.phase === Constants.CALCULATE_PH) {
                                                            selectHands(index+Math.floor(hands1.length), value)
                                                        }
                                                    }}>
                                                    <CardValue>{value.value}</CardValue>
                                                </NewTermCardMobile>
                                            }
                                        </Grow>
                                    ))}
                                </Tabs>
                            </WrapCardMobile>
                            </>
                        }
                    </Card>
                    {(selector.game.phase === Constants.CALCULATE_PH) &&
                        <CalcAreaMobile>
                            <AreaTagMobile align="left">{selector.msg.lang.CALCULATE_FIELD}</AreaTagMobile>
                            {calcs &&
                                <WrapCardMobile>
                                    <Tabs
                                        value={tab}
                                        variant="scrollable"
                                        scrollButtons
                                        allowScrollButtonsMobile>
                                        {calcs.map((value, index) => (
                                            <Grow in={fade} timeout={1000} key={index}>
                                                {(selector.game.phase === Constants.CALCULATE_PH) || (!value.newFlg) ?
                                                    <TermCardMobile variant="contained"
                                                        onClick={() => selectCalcs(index, value)}
                                                        disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                        <CardValue>{value.value}</CardValue>
                                                    </TermCardMobile>
                                                :
                                                    <NewTermCardMobile variant="contained"
                                                        onClick={() => selectCalcs(index, value)}
                                                        disabled={!(selector.game.phase === Constants.CALCULATE_PH)}>
                                                        <CardValue>{value.value}</CardValue>
                                                    </NewTermCardMobile>
                                                }
                                            </Grow>
                                        ))}
                                    </Tabs>
                                </WrapCardMobile>
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
                        </CalcAreaMobile>
                    }
                </div>
            }
        </div>
    )
}

export default CalcComponent;