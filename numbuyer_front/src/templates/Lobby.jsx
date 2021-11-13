import React from 'react';
import PlayerListComponent from './components/PlayerListComponent';

import { useStyles } from './theme';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';

const Lobby = () => {
    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <h1 className={classes.title}>NumBuyer</h1>
                <PlayerListComponent/>
            </div>
        </Typography>
    )
}

export default Lobby;