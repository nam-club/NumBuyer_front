import React from 'react';
import PlayerListComponent from './components/PlayerListComponent';
import SettingComponent from './components/SettingComponent';

import { useStyles, MainLogo, MainTitle, Back, SettingIcon, MenuModal, TopMenu } from './theme';
import { MainLogoMobile, MainTitleMobile } from './themeMobile';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';

import logo from '../assets/logo.png';
import title from '../assets/title.png';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "@mui/material";

const Lobby = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);

    const [settingOpen, setSettingOpen] = React.useState(false); // 設定ボタンのモーダル

    const matches = useMediaQuery("(min-width:520px)");

    // 設定モーダルを開く or 閉じる
    const handleSettingOpen = () => {
        setSettingOpen(!settingOpen);
    };

    // 設定モーダルを閉じる
    const handleSettingClose = () => {
        setSettingOpen(false);
    };

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <Back>
                {matches ? 
                <div>
                    <div><MainLogo src={logo}/></div>
                    <div><MainTitle src={title}/></div>
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