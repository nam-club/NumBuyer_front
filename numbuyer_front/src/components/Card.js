import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
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

export default function SimpleCard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <TextField inputProps={{className: classes.nameField}} InputLabelProps={{className: classes.nameField}}
                    id="standard-basic" label="Player Name" />
                </CardContent>
                <CardActions>
                    <Grid item xs={6}>
                        <Button size="big" className={classes.actionButton + " " + classes.quickButton}>Quick Match</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="big" className={classes.actionButton + " " + classes.friendButton}
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
                        id="standard-basic" label="Room Name" />
                        <Button size="big" className={classes.actionButton + " " + classes.friendButton}>Create or Join</Button>
                    </div>
                    </Fade>
                </Modal>
            </Card>
        </div>
    );
}