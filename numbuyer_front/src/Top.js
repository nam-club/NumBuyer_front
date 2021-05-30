import React from 'react';
import Card from './components/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
    root: {
        background: grey[900],
        paddingTop: 200,
        paddingBottom: 300,
    },
    title: {
        color: 'white',
    }
});

export default function Top() {
    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <div className={classes.root}>
                <h1 className={classes.title}>NumBuyer</h1>
                <Card />
            </div>
        </Typography>
    )
}