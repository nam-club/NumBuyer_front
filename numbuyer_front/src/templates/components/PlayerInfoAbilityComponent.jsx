import React from 'react';
import { useSelector } from 'react-redux';

import { AbilityInfoCard, SpeechBubble } from '../theme';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const PlayerInfoAbilityComponent = (props) => {
    const selector = useSelector(state => state);

    return (
        <Typography>
            <Tooltip title={
                <SpeechBubble>
                    {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).comment}
                </SpeechBubble>}
            placement="bottom">
                <AbilityInfoCard size="large" variant="contained"
                sx={{ background: props.background, color: props.color }}>
                    {props.ability.display.find((d) => {return d.lang === selector.msg.lang.LANGUAGE}).name}
                </AbilityInfoCard>
            </Tooltip>
        </Typography>
    );
}

export default PlayerInfoAbilityComponent;