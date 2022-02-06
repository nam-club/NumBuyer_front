import React from 'react';
import PlayerListComponent from './components/PlayerListComponent';

import { useStyles, MainLogo, MainTitle, Back } from './theme';

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
                <MainLogo src={logo}/>
                <MainTitle src={title}/>
                <PlayerListComponent/>
            </Back>
        </Typography>
    )
}

export default Lobby;