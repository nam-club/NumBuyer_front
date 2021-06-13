import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { useStyles } from '../theme';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const Lobby = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <h1 className={classes.title}>NumBuyer</h1>
                <Card className={classes.root}>
                    <h2 className={classes.menu}>Lobby</h2>
                    <h3 className={classes.name}>{selector.players.players[0].name}</h3>
                    <h3 className={classes.name}>{selector.players.players[1].name}</h3>
                    <h3 className={classes.name}>{selector.players.players[2].name}</h3>
                    <h3 className={classes.name}>{selector.players.players[3].name}</h3>
                    <CardActions>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button size="large" className={classes.startButton + " " + classes.quickButton}
                        onClick={() => {dispatch(push('/Game'));}}>Start</Button>
                    </CardActions>
                </Card>
            </div>
        </Typography>
    )
}

export default Lobby;