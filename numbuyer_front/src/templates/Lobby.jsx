import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerListComponent from './components/PlayerListComponent';
import usePersist from '../Persist';

import { useStyles } from './theme';
import * as Constants from '../constants';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';

const Lobby = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [gameData, setGameData] = usePersist("gameData", null);
    const [players, setPlayers] = React.useState(gameData.players.players);
    const [roomId, setRoomId] = React.useState(gameData.room.roomId);

    React.useEffect(() => {
        setGameData(selector);
    }, [selector]);

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <h1 className={classes.title}>NumBuyer</h1>
                <PlayerListComponent players={players} roomId={roomId}/>
            </div>
        </Typography>
    )
}

export default Lobby;