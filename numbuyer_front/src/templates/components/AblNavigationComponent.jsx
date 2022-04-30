import React from 'react';

import { MessageBox, NaviMessage, NaviMessages } from '../theme';

const AblNavigationComponent = (props) => {

    return (
        <MessageBox sx={{background: props.background}}>
            <NaviMessage>{props.message}</NaviMessage>
            <NaviMessages>{props.effect}</NaviMessages>
        </MessageBox>
    );
}

export default AblNavigationComponent;