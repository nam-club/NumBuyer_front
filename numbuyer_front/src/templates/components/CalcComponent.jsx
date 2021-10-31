import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';

import { setMessageAction, setPhaseAction, setTimeAction } from '../../redux/game/actions';
import { setCardsAction } from '../../redux/players/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const CalcComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [hands, setHands] = React.useState(props.cards);
    const [calcs, setCalcs] = React.useState([]);
    const [disableFlg, setDisableFlg] = React.useState(false);
    const {calculate} = React.useContext(CTX);

    React.useEffect(() => {
        setHands(props.cards);
    }, [props.cards]);

    const selectHands = (index, value) => {
        const newHands = [...hands];
        newHands.splice(index, 1);
        setHands(newHands);
        setCalcs([...calcs, value]);
        console.log(calcs);
    }

    const selectCalcs = (index, value) => {
        const newCalcs = [...calcs];
        newCalcs.splice(index, 1);
        setCalcs(newCalcs);
        setHands([...hands, value]);
        console.log(hands);
    }

    const ansCalc = () => {
        // ボタン連打防止
        setDisableFlg(true);

        if(calcs.length === 0) {
            dispatch(setMessageAction({message: Constants.CALC_ERR_MSG}));
            setDisableFlg(false);
        }else {
            let calculateCards = calcs.slice();
            calcs.length = 0;
            calculate({playerId: selector.players.player.playerId, calculateCards: calculateCards, action: 'answer'});
        }
        // mock
        let msg = '{"isCorrectAnswer":true,"playerId":1,"cards":["2", "-", "3"]}';
        let resObj = JSON.parse(msg);
        if(resObj.isCorrectAnswer) {
            // 正解メッセージを表示
            dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG1}));
        }else {
            // 不正解メッセージを表示
            dispatch(setMessageAction({message: Constants.CALC_RESULT_MSG0}));
        }
        // 返されたカードをセット
        dispatch(setCardsAction(resObj)); 
    }

    const passCalc = () => {
        // ボタン連打防止
        setDisableFlg(true);

        calculate({playerId: selector.player.playerId, calculateCards: null, action: 'pass'});
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <Card className={classes.hand}>
                        <h3 className={classes.handMessage} align="left">My Cards</h3>
                        <table>
                            <tbody>
                                <tr>
                                    {hands.map((value, index) => (
                                        <td key={index}>
                                            <Button className={classes.card} onClick={() => selectHands(index, value)}
                                            disabled={!(selector.game.phase == Constants.CALCULATE_PH)}>
                                                <h1 className={classes.message}>{value}</h1>
                                            </Button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={10}>
                    <Card className={classes.calc}>
                        <h3 className={classes.calcMessage} align="left">Calculate Field</h3>
                        <Grid item xs={1}>
                            {calcs &&
                                <table>
                                    <tbody>
                                        <tr>
                                            {calcs.map((value, index) => (
                                                <td key={index}>
                                                    <Button className={classes.card} onClick={() => selectCalcs(index, value)}
                                                    disabled={!(selector.game.phase == Constants.CALCULATE_PH)}>
                                                        <h1 className={classes.message} >{value}</h1>
                                                    </Button>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        </Grid>
                        <Button size="large" className={classes.calcButton} onClick={() => ansCalc()}
                        disabled={!(selector.game.phase == Constants.CALCULATE_PH) || disableFlg}>ANSWER</Button>
                        <Button size="large" className={classes.passButton} onClick={() => passCalc()}
                        disabled={!(selector.game.phase == Constants.CALCULATE_PH) || disableFlg}>PASS</Button>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default CalcComponent;