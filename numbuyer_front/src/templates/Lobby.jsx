import React from 'react';
import PlayerListComponent from './components/PlayerListComponent';

import { useStyles, Back } from './theme';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';

import logo from '../assets/logo.png';
import title from '../assets/title.png';

const Lobby = () => {
    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <Back>
                <img src={logo} className={classes.logo}/>
                <img src={title} className={classes.title}/>
                <PlayerListComponent/>
            </Back>
        </Typography>
    )
}

export default Lobby;