import React from 'react';
import Card from './components/Card';

import { makeStyles } from '@material-ui/core/styles';
import GlobalStyle from "./globalStyles";
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

const useStyles = makeStyles({
    root: {
        background: grey[900],
        paddingTop: 200,
        paddingBottom: 300,
    },
    title: {
        color: yellow[300],
        fontSize: '4em',
        fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
    },
});

export default function Top() {
    const classes = useStyles();

    return (
        <Typography component="div" align="center">
            <GlobalStyle />
            <div className={classes.root}>
                <h1 className={classes.title}>NumBuyer</h1>
                <Card />
            </div>
        </Typography>
    )
}