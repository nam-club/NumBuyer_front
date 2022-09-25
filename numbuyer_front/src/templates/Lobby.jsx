import React from 'react';
import { useSelector } from 'react-redux';

import PlayerListComponent from './components/PlayerListComponent';

import { MainLogo, MainTitle, Back, LobbyTitle } from './theme';
import { MainLogoMobile, MainTitleMobile } from './themeMobile';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';

import logo from '../assets/logo.png';
import title from '../assets/title.png';
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
                    <div sx={{display: 'flex'}}>
                        <MainLogo src={logo}/>
                        <MainTitle src={title}/>
                    </div>
                    <LobbyTitle sx={{margin: '0 20%'}}>{selector.msg.lang.LOBBY}</LobbyTitle>
                </div>
                :
                <div>
                    <div><MainLogoMobile src={logo}/></div>
                    <div><MainTitleMobile src={title}/></div>
                </div>
                }
                <PlayerListComponent/>
            </Back>
        </Typography>
    )
}

export default Lobby;