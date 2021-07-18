import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMessageAction, setStatusAction, setTimeAction } from '../../redux/game/actions';

import * as Constants from '../../constants';
import usePersist from '../../Persist';

import { useStyles } from '../theme';

import Card from '@material-ui/core/Card';

const TimeComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [gameData, setGameData] = usePersist("gameData", null);

    const [time, setTime] = React.useState(selector.game.time);
    const [status, setStatus] = React.useState(selector.game.status);
    const [flag, setFlag] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setGameData(selector);
            setTime(t => {
                if(t<=0) {
                    return 0;
                }
                return t-1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if(time==0) {
            switch(selector.game.status) {
                case Constants.READY_ST:
                    dispatch(setStatusAction({status: Constants.GIVE_CARD_ST}));
                    dispatch(setMessageAction({message: Constants.GIVE_CARD_MSG}));
                    dispatch(setTimeAction({time: Constants.GIVE_CARD_TIME}));
                    setTime(Constants.GIVE_CARD_TIME);
                    break;
                case Constants.GIVE_CARD_ST:
                    dispatch(setStatusAction({status: Constants.SHOW_ANS_ST}));
                    dispatch(setMessageAction({message: (Constants.SHOW_ANS_MSG + '22')}));
                    dispatch(setTimeAction({time: Constants.SHOW_ANS_TIME}));
                    setTime(Constants.SHOW_ANS_TIME);
                    props.setAnsCard('22');
                    break;
                case Constants.SHOW_ANS_ST:
                    dispatch(setStatusAction({status: Constants.SHOW_AUC_ST}));
                    dispatch(setMessageAction({message: ('9' + Constants.SHOW_AUC_MSG)}));
                    dispatch(setTimeAction({time: Constants.SHOW_AUC_TIME}));
                    setTime(Constants.SHOW_AUC_TIME);
                    props.setAucCard('9');
                    break;
                case Constants.SHOW_AUC_ST:
                    dispatch(setStatusAction({status: Constants.AUCTION_ST}));
                    dispatch(setMessageAction({message: (Constants.AUCTION_MSG1 + props.aucCard + Constants.AUCTION_MSG2)}));
                    dispatch(setTimeAction({time: Constants.AUCTION_TIME}));
                    setTime(Constants.AUCTION_TIME);
                    setFlag(true);
                    break;
                default:
                    break;
            }
        }
    }, [time]);

    return (
        <Card className={classes.time}>
            <h3 className={classes.tag}>Time</h3>
            <h1 className={classes.message}>{flag ? time : "　"}</h1>
        </Card>
    )
}

export default TimeComponent;