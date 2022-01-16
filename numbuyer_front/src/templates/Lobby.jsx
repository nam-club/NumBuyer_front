import React from 'react';
import PlayerListComponent from './components/PlayerListComponent';

import { useStyles } from './theme';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';

import logo from '../assets/logo.png';
import title from '../assets/title.png';

const Lobby = () => {
    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <img src={logo} className={classes.logo}/>
                <img src={title} className={classes.title}/>
                <PlayerListComponent/>
            </div>
        </Typography>
    )
}

export default Lobby;