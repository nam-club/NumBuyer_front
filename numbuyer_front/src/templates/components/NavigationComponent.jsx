import React from 'react';

import { MessageBox, NaviMessage, NaviMessages } from '../theme';

const NavigationComponent = (props) => {

    return (
        <MessageBox sx={{background:props.background, color:props.color}}>
            <NaviMessage>{props.message}</NaviMessage>
            {props.messages.length !==0 && props.messages.messages.map((value, index) => (
                <NaviMessages key={index}>{value}</NaviMessages>))
            }
        </MessageBox>
    );
}

export default NavigationComponent;