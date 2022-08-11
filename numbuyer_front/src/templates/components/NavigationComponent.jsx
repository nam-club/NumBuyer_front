import React from 'react';

import { MessageBox, NaviMessage, NaviMessages } from '../theme';
import { MessageBoxMobile, NaviMessageMobile, NaviMessagesMobile } from '../themeMobile';

import { useMediaQuery } from "@mui/material";

const NavigationComponent = (props) => {
    const matches = useMediaQuery("(min-width:520px)");

    return (
        <div>
        {matches ?
        <MessageBox sx={{background:props.background, color:props.color}}>
            <NaviMessage>{props.message}</NaviMessage>
            {props.messages.length !==0 && props.messages.messages.map((value, index) => (
                <NaviMessages key={index}>{value}</NaviMessages>))
            }
        </MessageBox>
        :
        <MessageBoxMobile sx={{background:props.background, color:props.color}}>
            <NaviMessageMobile>{props.message}</NaviMessageMobile>
            {props.messages.length !==0 && props.messages.messages.map((value, index) => (
                <NaviMessagesMobile key={index}>{value}</NaviMessagesMobile>))
            }
        </MessageBoxMobile>
        }
        </div>
    );
}

export default NavigationComponent;