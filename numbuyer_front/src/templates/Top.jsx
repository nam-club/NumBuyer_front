import React from 'react';

import { useStyles } from './theme';
import * as Constants from '../constants';
import * as ConstantsMsg from '../constantsMsg';

import { CTX } from '../Socket';

import { useDispatch, useSelector } from 'react-redux';

import { setRoomAction } from '../redux/room/actions';
import { setLangAction, setValidAction, setErrMsgAction } from '../redux/msg/actions';

import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

const Top = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const {joinQuickMatch, createMatch, joinFriendMatch} = React.useContext(CTX);

    const [name, setName] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [open, setOpen] = React.useState(false);

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

    const handleClose = () => {
        setOpen(false);
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
            <div className={classes.back}>
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
                <h1 className={classes.title}>NumBuyer</h1>
                <Card className={classes.root}>
                    <CardContent>
                        <TextField inputProps={{className: classes.nameField}} InputLabelProps={{className: classes.nameField}}
                        id="standard-basic" label={selector.msg.lang.PLAYER_NAME} value={name} 
                        onChange={doChange}/>
                        {selector.msg.validFlg &&
                            <p className={classes.errorField}>{selector.msg.errMsg}</p>
                        }
                    </CardContent>
                    <CardActions>
                        <Grid item xs={6}>
                            <Button size="large" variant="contained" className={classes.actionButton + " " + classes.quickButton}
                            onClick={clickQuick}>{selector.msg.lang.QUICK_MATCH}</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="large" variant="contained" className={classes.actionButton + " " + classes.friendButton}
                            onClick={handleOpen}>{selector.msg.lang.FRIEND_MATCH}</Button>
                        </Grid>
                    </CardActions>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className={classes.paper}>
                            <Grid container>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={7}>
                                    <Button size="large" variant="contained" className={classes.createButton} 
                                    onClick={() => {
                                        dispatch(setValidAction({validFlg: false}));
                                        dispatch(setRoomAction({roomId: roomId}));
                                        createMatch({playerName: name, roomId: roomId});
                                    }}>{selector.msg.lang.CREATE_BTN}</Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField inputProps={{className: classes.nameField}} InputLabelProps={{className: classes.nameField}}
                                    id="standard-basic" label={selector.msg.lang.ROOM_ID} value={roomId} 
                                    onChange={e => setRoomId(e.target.value)} />
                                </Grid>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button size="large" variant="contained" className={classes.joinButton} 
                                    onClick={() => {
                                        dispatch(setValidAction({validFlg: false}));
                                        dispatch(setRoomAction({roomId: roomId}));
                                        joinFriendMatch({playerName: name, roomId: roomId});
                                    }}>{selector.msg.lang.JOIN_BTN}</Button>
                                </Grid>
                            </Grid>
                        </div>
                        </Fade>
                    </Modal>
                </Card>
            </div>
        </Typography>
    )
}

export default Top;