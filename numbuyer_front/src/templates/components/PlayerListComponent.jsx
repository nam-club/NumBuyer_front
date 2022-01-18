import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTX } from '../../Socket';
import { push } from 'connected-react-router';

import { useStyles } from '../theme';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const PlayerListComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const { start } = React.useContext(CTX);

    return (
        <Card className={classes.root}>
            <h2 className={classes.menu}>{selector.msg.lang.LOBBY}</h2>
            {selector.players.players &&
             selector.players.players.map((value) => (<h3 key={value.playerName} className={classes.name}>{value.playerName}</h3>))}
            <CardActions>
                <div style={{ flexGrow: 1 }}></div>
                <Grid container>
                    <Grid item xs={4}>
                        <Button size="large" variant="contained" className={classes.startButton + " " + classes.friendButton}
                        onClick={() => {
                            dispatch(push('/'));
                        }}>{selector.msg.lang.BACK_BTN}</Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                    {(selector.players.player && selector.players.player.isOwner) &&
                        <Button size="large" variant="contained" className={classes.startButton + " " + classes.quickButton}
                        onClick={() => {
                            start({roomId: selector.room.roomId, playerId: selector.players.player.playerId})
                        }}>{selector.msg.lang.START_BTN}</Button>
                    }  
                    </Grid>
                </Grid>
            </CardActions>
            <h3 className={classes.tag}>
                {selector.msg.lang.ROOM_ID + ' : ' + selector.room.roomId}
            </h3>
        </Card>
    )
}

export default PlayerListComponent;