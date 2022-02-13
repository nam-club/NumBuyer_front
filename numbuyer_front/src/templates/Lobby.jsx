import React from 'react';
import PlayerListComponent from './components/PlayerListComponent';
import SettingComponent from './components/SettingComponent';

import { useStyles, MainLogo, MainTitle, Back, SettingIcon, MenuModal, TopMenu } from './theme';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';

import logo from '../assets/logo.png';
import title from '../assets/title.png';

const Lobby = () => {
    const classes = useStyles();

    const [settingOpen, setSettingOpen] = React.useState(false); // 設定ボタンのモーダル

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
                <Grid container>
                    <Grid item xs={8}/>
                    <Grid item xs={2}>
                        <Button onClick={handleSettingOpen}>
                            <SettingIcon/>
                        </Button>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
                <MenuModal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={settingOpen}
                    onClose={handleSettingClose}
                    closeAfterTransition
                >
                    <Fade in={settingOpen}>
                        <TopMenu>
                            <SettingComponent/>
                        </TopMenu>
                    </Fade>
                </MenuModal>
                <MainLogo src={logo}/>
                <MainTitle src={title}/>
                <PlayerListComponent/>
            </Back>
        </Typography>
    )
}

export default Lobby;