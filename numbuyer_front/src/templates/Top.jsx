import React from 'react';

import { useStyles } from './theme';
import * as Constants from '../constants';

//import { CTX } from '../Socket';

import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { setPlayerAction, setPlayersAction } from '../redux/players/actions';
import { setRoomAction } from '../redux/room/actions';
import { setValidAction, setErrMsgAction, setNameAction } from '../redux/top/actions';

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
import Grid from '@material-ui/core/Grid';

const Top = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    //const {joinQuickMatch, joinFriendMatch} = React.useContext(CTX);

    const [code, setCode] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const doChange = (e) => {
        if(!e.target.value.match(Constants.NAME_EXP)) {
            dispatch(setNameAction({name: e.target.value}));
        }
        if(e.target.value !== '' && !e.target.value.match(Constants.NAME_EXP)) {
            dispatch(setValidAction({validFlg: false}));
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(e.target.value !== '') {
                dispatch(setErrMsgAction({errMsg: Constants.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: Constants.NULL_NAME_ERR}));
            }
        }
    }

    const handleOpen = () => {
        if(selector.top.name !== '' && !selector.top.name.match(Constants.NAME_EXP)) {
            setOpen(true);
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(selector.top.name !== '') {
                dispatch(setErrMsgAction({errMsg: Constants.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: Constants.NULL_NAME_ERR}));
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickQuick = () => {
        if(selector.top.name !== '' && !selector.top.name.match(Constants.NAME_EXP)) {
            dispatch(setPlayerAction({id: "001", name: selector.top.name, money: Constants.MONEY, cards: []}));
            dispatch(setPlayerAction({id: "002", name: "aoki", money: Constants.MONEY, cards: []}));
            dispatch(setPlayerAction({id: "003", name: "maeda", money: Constants.MONEY, cards: []}));
            dispatch(setPlayerAction({id: "004", name: "nagasawa", money: Constants.MONEY, cards: []}));
            //joinQuickMatch({id: "001", name: name, money: 100, cards: []});
            dispatch(push('/Lobby'));
        }else {
            dispatch(setValidAction({validFlg: true}));
            if(selector.top.name !== '') {
                dispatch(setErrMsgAction({errMsg: Constants.SYMBOL_ERR}));
            }else {
                dispatch(setErrMsgAction({errMsg: Constants.NULL_NAME_ERR}));
            }
        }
    }

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <h1 className={classes.title}>NumBuyer</h1>
                <Card className={classes.root}>
                    <CardContent>
                        <TextField inputProps={{className: classes.nameField}} InputLabelProps={{className: classes.nameField}}
                        id="standard-basic" label="Player Name" value={selector.top.name} 
                        onChange={doChange}/>
                        {selector.top.validFlg &&
                            <p className={classes.errorField}>{selector.top.errMsg}</p>
                        }
                    </CardContent>
                    <CardActions>
                        <Grid item xs={6}>
                            <Button size="large" className={classes.actionButton + " " + classes.quickButton}
                            onClick={clickQuick}>Quick Match</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="large" className={classes.actionButton + " " + classes.friendButton}
                            onClick={handleOpen}>Play with Friend</Button>
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
                            <TextField inputProps={{className: classes.nameField}} InputLabelProps={{className: classes.nameField}}
                            id="standard-basic" label="Room Name" value={code} 
                            onChange={e => setCode(e.target.value)} />
                            <Button size="large" className={classes.actionButton + " " + classes.friendButton} 
                            onClick={() => {
                                dispatch(setRoomAction({code: code}));
                                //joinFriendMatch(player);
                                dispatch(push('/'));
                            }}>Create or Join</Button>
                        </div>
                        </Fade>
                    </Modal>
                </Card>
            </div>
        </Typography>
    )
}

export default Top;