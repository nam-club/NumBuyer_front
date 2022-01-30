import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../theme';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const TutorialComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    return (
        <Paper elevation={3} />
    );
}

export default TutorialComponent;