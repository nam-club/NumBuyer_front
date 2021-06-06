import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { setPlayerAction, setPlayersAction } from '../redux/players/actions';
import { setRoomAction } from '../redux/room/actions';

import { makeStyles } from '@material-ui/core/styles';
import GlobalStyle from "../globalStyles";
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
    back: {
        background: grey[900],
        paddingTop: 200,
        paddingBottom: 300,
    },
    title: {
        color: yellow[300],
        fontSize: '4em',
        fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
    },
    root: {
        marginRight: 300,
        marginLeft: 300,
        background: grey[300],
    },
    nameField: {
        fontSize: '3em',
        color: grey[600],
        paddingTop: 80,
        marginTop: -50,
    },
    actionButton: {
        padding: 50,
        margin: 10,
        fontSize: 30,
    },
    quickButton: {
        background: blue[200],
        '&:hover': {
            background: blue[100],
         },
    },
    friendButton: {
        background: green[200],
        '&:hover': {
            background: green[100],
         },
    },
    typography: {
        fontSize: '2rem',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 8, 6),
    },
}));

const Top = () => {
    const dispatch = useDispatch();

    const [name, changeName] = React.useState('');
    const [code, changeCode] = React.useState('');

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.back}>
                <h1 className={classes.title}>NumBuyer</h1>
                <Card className={classes.root}>
                    <CardContent>
                        <TextField inputProps={{className: classes.nameField}} InputLabelProps={{className: classes.nameField}}
                        id="standard-basic" label="Player Name" value={name} 
                        onChange={e => changeName(e.target.value)} />
                    </CardContent>
                    <CardActions>
                        <Grid item xs={6}>
                            <Button size="large" className={classes.actionButton + " " + classes.quickButton}
                            onClick={() => {
                                dispatch(setPlayersAction({players: [
                                    {id: "001", name: name, money: 100, cards: []},
                                    {id: "002", name: "aoki", money: 100, cards: []},
                                    {id: "003", name: "maeda", money: 100, cards: []},
                                    {id: "004", name: "nagasawa", money: 100, cards: []},
                                ]}));
                                dispatch(push('/'));
                            }}>Quick Match</Button>
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
                            onChange={e => changeCode(e.target.value)} />
                            <Button size="large" className={classes.actionButton + " " + classes.friendButton} 
                            onClick={() => {
                                dispatch(setRoomAction({code: code}));
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