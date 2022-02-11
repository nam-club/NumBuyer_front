import React from 'react';


import { useStyles, MainLogo, MainTitle, Back, MenuCard, InputField, QuickButton,
        FriendButton, FriendModal, FriendMenu, CreateButton, JoinButton, ErrorMessage,
        LangButton, TutorialIcon, MenuModal, TopMenu } from './theme';
import * as Constants from '../constants';
import * as ConstantsMsg from '../constantsMsg';

import { CTX } from '../Socket';

import { useDispatch, useSelector } from 'react-redux';

import { setPlayerNameAction } from '../redux/players/actions'
import { setRoomAction } from '../redux/room/actions';
import { setLangAction, setValidAction, setErrMsgAction } from '../redux/msg/actions';

import SettingComponent from './components/SettingComponent';
import TutorialComponent from './components/TutorialComponent';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';

import logo from '../assets/logo.png';
import title from '../assets/title.png';

const Top = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const {joinQuickMatch, createMatch, joinFriendMatch} = React.useContext(CTX);

    const [name, setName] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [tutorialOpen, setTutorialOpen] = React.useState(false); // チュートリアルのモーダル
    const [friendOpen, setFriendOpen] = React.useState(false); // フレンドマッチのモーダル

    /** 強制的に再レンダリングさせる */
    const useForceUpdate = () => {
        const [, forceUpdate] = React.useState(undefined);
        return React.useCallback(() => {
            forceUpdate((s) => !s);
        }, []);
    };
    const forceUpdate = useForceUpdate();

    // チュートリアルを開く or 閉じる
    const handleTutorialOpen = () => {
        setTutorialOpen(!tutorialOpen);
    };

    // チュートリアルを閉じる
    const handleTutorialClose = () => {
        setTutorialOpen(false);
    };

    // フレンドマッチ用モーダルを開く
    const handleFriendOpen = () => {
        if(name !== '' && !name.match(Constants.NAME_EXP)) {
            setFriendOpen(true);
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(name !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_NAME_ERR}));
            }
        }
    };

    // フレンドマッチ用モーダルを閉じる
    const handleFriendClose = () => {
        setFriendOpen(false);
    };

    // テキストボックス入力
    const doChange = (e) => {
        if(!e.target.value.match(Constants.NAME_EXP)) {
            setName(e.target.value);
        }
        if(e.target.value !== '' && !e.target.value.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(e.target.value !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_NAME_ERR}));
            }
        }
    }

    // クイックマッチ
    const clickQuick = () => {
        if(name !== '' && !name.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({validFlg: false}));
            dispatch(setPlayerNameAction(name));
            joinQuickMatch({playerName: name});
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(name !== '') {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: selector.msg.lang.NULL_NAME_ERR}));
            }
        }
    }

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <Back>
                <Grid container>
                    <Grid item xs={7}/>
                    <Grid item xs={2}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <LangButton onClick={() => {
                                dispatch(setLangAction(ConstantsMsg.English));
                                forceUpdate();
                            }}>{selector.msg.lang.LANG_EN}</LangButton>
                            <LangButton onClick={() => {
                                dispatch(setLangAction(ConstantsMsg.Japanese));
                                forceUpdate();
                            }}>{selector.msg.lang.LANG_JP}</LangButton>
                            <LangButton onClick={() => {
                                dispatch(setLangAction(ConstantsMsg.Chinese));
                                forceUpdate();
                            }}>{selector.msg.lang.LANG_CN}</LangButton>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={handleTutorialOpen}>
                            <TutorialIcon/>
                        </Button>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
                <MenuModal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={tutorialOpen}
                    onClose={handleTutorialClose}
                    closeAfterTransition
                >
                    <Fade in={tutorialOpen}>
                        <TopMenu>
                            <TutorialComponent/>
                        </TopMenu>
                    </Fade>
                </MenuModal>
                <MainLogo src={logo}/>
                <MainTitle src={title}/>
                <MenuCard>
                    <CardContent>
                        <InputField variant="standard" label={selector.msg.lang.PLAYER_NAME} value={name} 
                        inputProps={{ style: {fontSize: '3em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } }
                        InputLabelProps={{ style: {fontSize: '3em'} }}
                        onChange={doChange}/>
                        {selector.msg.validFlg &&
                            <ErrorMessage>{selector.msg.errMsg}</ErrorMessage>
                        }
                    </CardContent>
                    <CardActions>
                        <Grid item xs={6}>
                            <QuickButton size="large" variant="contained"
                            onClick={clickQuick}>{selector.msg.lang.QUICK_MATCH}</QuickButton>
                        </Grid>
                        <Grid item xs={6}>
                            <FriendButton size="large" variant="contained"
                            onClick={handleFriendOpen}>{selector.msg.lang.FRIEND_MATCH}</FriendButton>
                        </Grid>
                    </CardActions>
                    <FriendModal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={friendOpen}
                        onClose={handleFriendClose}
                        closeAfterTransition
                    >
                        <Fade in={friendOpen}>
                            <FriendMenu>
                                <div align="center">
                                    <CreateButton size="large" variant="contained"
                                    onClick={() => {
                                        dispatch(setValidAction({validFlg: false}));
                                        dispatch(setRoomAction({roomId: roomId}));
                                        dispatch(setPlayerNameAction(name));
                                        createMatch({playerName: name, roomId: roomId});
                                    }}>{selector.msg.lang.CREATE_BTN}</CreateButton>
                                </div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <InputField variant="standard" label={selector.msg.lang.ROOM_ID} value={roomId} 
                                        inputProps={{ style: {fontSize: '3em', color: grey[600], marginTop: '2%'} } }
                                        InputLabelProps={{ style: {fontSize: '3em'} }}
                                        onChange={e => setRoomId(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <JoinButton size="large" variant="contained"
                                        onClick={() => {
                                            dispatch(setValidAction({validFlg: false}));
                                            dispatch(setRoomAction({roomId: roomId}));
                                            dispatch(setPlayerNameAction(name));
                                            joinFriendMatch({playerName: name, roomId: roomId});
                                        }}>{selector.msg.lang.JOIN_BTN}</JoinButton>
                                    </Grid>
                                </Grid>
                            </FriendMenu>
                        </Fade>
                    </FriendModal>
                </MenuCard>
            </Back>
        </Typography>
    )
}

export default Top;