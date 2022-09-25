import React from 'react';

import { useStyles } from '../theme';

import Card from '@mui/material/Card';
import { useMediaQuery } from "@mui/material";

const FluctParamComponent = (props) => {
    const classes = useStyles();
    const matches = useMediaQuery("(min-width:520px)");

    return (
        <div>
        {matches ?
        <Card className={classes.fluct_animation}
        sx={{background: props.background, color: props.color, left: props.left, marginRight: '2%'}}>
            <span sx={{margin: 0, fontSize: '0.75em'}}>{props.name + " "}</span>
            <span sx={{margin: 0, fontSize: '1.2em'}}>{props.message}</span>
        </Card>
        :
        <Card sx={{background: props.background, color: props.color}}>
            <p sx={{margin: 0}}>{props.name}</p>
            <p sx={{margin: 0, fontSize: '1.2em'}}>{props.message}</p>
            <p sx={{margin: 0}}>{props.from}</p>
        </Card>
        }
        </div>
    );
}

export default FluctParamComponent;