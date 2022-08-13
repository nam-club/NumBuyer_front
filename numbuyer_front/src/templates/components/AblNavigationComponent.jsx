import React from 'react';

import { MessageBox, NaviMessage, NaviMessages } from '../theme';
import { MessageBoxMobile, NaviMessageMobile, NaviMessagesMobile } from '../themeMobile';


import { useMediaQuery } from "@mui/material";

const AblNavigationComponent = (props) => {
    const matches = useMediaQuery("(min-width:520px)");

    return (
        <div>
        {matches ?
        <MessageBox sx={{background: props.background, color:props.color}}>
            <NaviMessage>{props.message}</NaviMessage>
            <NaviMessages>{props.effect}</NaviMessages>
        </MessageBox>
        :
        <MessageBoxMobile sx={{background: props.background, color:props.color}}>
            <NaviMessageMobile>{props.message}</NaviMessageMobile>
            <NaviMessagesMobile>{props.effect}</NaviMessagesMobile>
        </MessageBoxMobile>
        }
        </div>
    );
}

export default AblNavigationComponent;