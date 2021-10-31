import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';
import { push } from 'connected-react-router';

import { setMessageAction, setPhaseAction, setTimeAction, setSkipAction, setPassAction } from '../../redux/game/actions';
import { setCardsAction, setCoinAction } from '../../redux/players/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const AucComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { nextTurn, start } = React.useContext(CTX);

    return (
        <Card className={classes.root}>
            <h2 className={classes.menu}>Lobby</h2>
            {props.players.map((value) => (<h3 key={value.playerId} className={classes.name}>{value.playerName}</h3>))}
            <CardActions>
                <div style={{ flexGrow: 1 }}></div>
                <Grid container>
                    <Grid item xs={2}>
                        <Button size="large" className={classes.startButton + " " + classes.friendButton}
                        onClick={() => {
                            dispatch(push('/'));
                        }}>BACK</Button>
                    </Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2}>
                    {selector.players.player.isOwner &&
                        <Button size="large" className={classes.startButton + " " + classes.quickButton}
                        onClick={() => {
                            nextTurn({roomId: props.roomId, playerId: props.playerId});
                            //start({roomId: props.roomId,})
                            //dispatch(push('/Game'));
                            //setTimeout(function() {dispatch(push('/Game'))}, 3000);
                        }}>START</Button>
                    }  
                    </Grid>
                </Grid>
            </CardActions>
            <h3 className={classes.tag}>
                {'Room ID : ' + selector.room.roomId}
            </h3>
        </Card>
    )
}

export default AucComponent;