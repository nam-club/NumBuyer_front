import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { setMessageAction, setPhaseAction, setTimeAction } from '../redux/game/actions';

import { useStyles } from './theme';
import * as Constants from '../constants';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const Lobby = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <h1 className={classes.title}>NumBuyer</h1>
                <Card className={classes.root}>
                    <h2 className={classes.menu}>Lobby</h2>
                    {selector.players.map((value) => (<h3 key={value.playerId} className={classes.name}>{value.playerName}</h3>))}
                    <CardActions>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button size="large" className={classes.startButton + " " + classes.quickButton}
                        onClick={() => {
                            dispatch(setPhaseAction({phase: Constants.GIVE_CARD_PH}));
                            dispatch(setMessageAction({message: Constants.GIVE_CARD_MSG}));
                            dispatch(setTimeAction({time: Constants.GIVE_CARD_TIME}));
                            dispatch(push('/Game'));
                        }}>Start</Button>
                    </CardActions>
                </Card>
            </div>
        </Typography>
    )
}

export default Lobby;