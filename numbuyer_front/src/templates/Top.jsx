import React from 'react';

import { useStyles, Back, MenuCard, InputField, QuickButton,
         FriendButton, FriendModal, FriendMenu, CreateButton, JoinButton } from './theme';
import * as Constants from '../constants';
import * as ConstantsMsg from '../constantsMsg';

import { CTX } from '../Socket';

import { useDispatch, useSelector } from 'react-redux';

import { setRoomAction } from '../redux/room/actions';
import { setLangAction, setValidAction, setErrMsgAction } from '../redux/msg/actions';

import GlobalStyle from "../globalStyles";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
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
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [tutorialOpen, setTutorialOpen] = React.useState(false);

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

    // メニューリストを開く or 閉じる
    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
      };

    // フレンドマッチ用モーダルを開く
    const handleOpen = () => {
        if(name !== '' && !name.match(Constants.NAME_EXP)) {
            setOpen(true);
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
    const handleClose = () => {
        setOpen(false);
    };

    // チュートリアル用モーダルを開く
    const tutoHandleOpen = () => {
        setTutorialOpen(true);
    };

    // チュートリアル用モーダルを閉じる
    const tutoHandleClose = () => {
        setTutorialOpen(false);
    };

    const clickQuick = () => {
        if(name !== '' && !name.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({validFlg: false}));
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
                    <Grid item xs={5}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button className={classes.bg_tag} onClick={() => {
                                dispatch(setLangAction(ConstantsMsg.English));
                            }}>English</Button>
                            <Button className={classes.bg_tag} onClick={() => {
                                dispatch(setLangAction(ConstantsMsg.Japanese));
                            }}>Japanese</Button>
                            <Button className={classes.bg_tag} onClick={() => {
                                dispatch(setLangAction(ConstantsMsg.Chinese));
                            }}>Chinese</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <img src={logo} className={classes.logo}/>
                <img src={title} className={classes.title}/>
                <MenuCard>
                    <CardContent>
                        <InputField variant="standard" label={selector.msg.lang.PLAYER_NAME} value={name} 
                        inputProps={{ style: {fontSize: '3em', color: grey[600], marginTop: '2%', marginBottom: '-4%'} } }
                        InputLabelProps={{ style: {fontSize: '3em'} }}
                        onChange={doChange}/>
                        {selector.msg.validFlg &&
                            <p className={classes.errorField}>{selector.msg.errMsg}</p>
                        }
                    </CardContent>
                    <CardActions>
                        <Grid item xs={6}>
                            <QuickButton size="large" variant="contained"
                            onClick={clickQuick}>{selector.msg.lang.QUICK_MATCH}</QuickButton>
                        </Grid>
                        <Grid item xs={6}>
                            <FriendButton size="large" variant="contained"
                            onClick={handleOpen}>{selector.msg.lang.FRIEND_MATCH}</FriendButton>
                        </Grid>
                    </CardActions>
                    <FriendModal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                    >
                        <Fade in={open}>
                            <FriendMenu>
                                <CreateButton size="large" variant="contained"
                                onClick={() => {
                                    dispatch(setValidAction({validFlg: false}));
                                    dispatch(setRoomAction({roomId: roomId}));
                                    createMatch({playerName: name, roomId: roomId});
                                }}>{selector.msg.lang.CREATE_BTN}</CreateButton>
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