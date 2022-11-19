import React from 'react';
import { useSelector } from 'react-redux';

import PlayerListComponent from './components/PlayerListComponent';
import * as Constants from '../constants';

import { MainLogo, MainTitle, Back, LobbyTitle, VerMsg } from './theme';
import { MainLogoMobile, MainTitleMobile, VerMsgMobile } from './themeMobile';

import GlobalStyle from "../globalStyles";

import logo from '../assets/logo.png';
import title from '../assets/title.png';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import { useMediaQuery } from "@mui/material";

const Lobby = () => {
    const selector = useSelector(state => state);
    const matches = useMediaQuery("(min-width:520px)");

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <Back>
                {matches ? 
                <div>
                    <Grid container>
                        <Grid item xs={3}/>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <MainLogo src={logo}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <MainTitle src={title}/>
                                </Grid>
                                <Grid item xs={2}>
                                    <VerMsg sx={{color: grey[50], fontSize: '1.5em'}}>( {Constants.VERSION} )</VerMsg>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}/>
                    </Grid>
                    <LobbyTitle sx={{margin: '0 20%', background: 'linear-gradient(25deg, #9370db, #000000)'}}>{selector.msg.lang.LOBBY}</LobbyTitle>
                </div>
                :
                <div>
                    <MainLogoMobile src={logo}/>
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <MainTitleMobile src={title}/>
                        </Grid>
                        <Grid item xs={2}>
                            <VerMsgMobile sx={{color: grey[50], fontSize: '0.75em'}}>( {Constants.VERSION} )</VerMsgMobile>
                        </Grid>
                    </Grid>
                </div>
                }
                <PlayerListComponent/>
            </Back>
        </Typography>
    )
}

export default Lobby;