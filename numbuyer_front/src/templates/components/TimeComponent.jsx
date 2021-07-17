import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMessageAction, setStatusAction, setTimeAction } from '../../redux/game/actions';

import * as Constants from '../../constants';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';

const TimeComponent = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [time, setTime] = React.useState(selector.game.time);
    const [status, setStatus] = React.useState(selector.game.status);

    const classes = useStyles();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => {
                if(t<=0) {
                    clearInterval(interval);
                    return 0;
                }
                return t-1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const changeStatus = () => {
        console.log(selector.game.status)
        switch(selector.game.status) {
            case Constants.READY_ST:
                dispatch(setStatusAction({status: Constants.GIVE_CARD_ST}));
                dispatch(setMessageAction({message: Constants.GIVE_CARD_MSG}));
                dispatch(setTimeAction({time: Constants.GIVE_CARD_TIME}));
                return Constants.GIVE_CARD_TIME;
            case Constants.GIVE_CARD_ST:
                dispatch(setStatusAction({status: Constants.SHOW_ANS_ST}));
                dispatch(setMessageAction({message: Constants.SHOW_ANS_MSG}));
                dispatch(setTimeAction({time: Constants.SHOW_ANS_TIME}));
                return Constants.SHOW_ANS_TIME;
            case Constants.SHOW_ANS_ST:
                dispatch(setStatusAction({status: Constants.AUCTION_ST}));
                dispatch(setMessageAction({message: Constants.AUCTION_MSG}));
                dispatch(setTimeAction({time: Constants.AUCTION_TIME}));
                return Constants.AUCTION_TIME;
            default:
                return 0;
        }    
    }

    return (
        <Card className={classes.time}>
            <h3 className={classes.tag}>Time</h3>
            <h1 className={classes.message}>{time}</h1>
        </Card>
    )
}

export default TimeComponent;