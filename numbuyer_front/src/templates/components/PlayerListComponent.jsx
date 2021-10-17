import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';
import { push } from 'connected-react-router';

import { setMessageAction, setPhaseAction, setTimeAction, setSkipAction, setPassAction } from '../../redux/game/actions';
import { setCardsAction, setCoinAction } from '../../redux/players/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const AucComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { nextTurn } = React.useContext(CTX);

    return (
        <Card className={classes.root}>
            <h2 className={classes.menu}>Lobby</h2>
            {props.players.map((value) => (<h3 key={value.playerId} className={classes.name}>{value.playerName}</h3>))}
            <CardActions>
                <div style={{ flexGrow: 1 }}></div>
                <Button size="large" className={classes.startButton + " " + classes.quickButton}
                onClick={() => {
                    dispatch(setPhaseAction({phase: Constants.GIVE_CARD_PH}));
                    dispatch(setMessageAction({message: Constants.GIVE_CARD_MSG}));
                    dispatch(setTimeAction({time: Constants.GIVE_CARD_TIME}));
                    dispatch(push('/Game'));
                    nextTurn({roomId: props.roomId, playerId: props.playerId});
                }}>Start</Button>
            </CardActions>
        </Card>
    )
}

export default AucComponent;