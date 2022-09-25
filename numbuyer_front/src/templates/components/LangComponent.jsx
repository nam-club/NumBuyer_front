import React from 'react';
import { useSelector } from 'react-redux';

import NavigationComponent from './NavigationComponent';
import * as ConstantsMsg from '../../constantsMsg';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { grey } from '@mui/material/colors';

import navigation from '../../assets/navigation.png';

const LangComponent = (props) => {
    const selector = useSelector(state => state);

    return (
        <Typography component="div" align="center" >
            <NavigationComponent backgroundImage={`url(${navigation})`} message={selector.msg.lang.LANG} color={grey[50]} messages={[]} />
            <List component="nav">
                <ListItem button onClick={()=>{props.changeLang(ConstantsMsg.English.LANGUAGE)}}>
                    <ListItemText sx={{fontSize: '2em'}} primary={selector.msg.lang.LANG_EN} />
                </ListItem>
                <Divider />
                <ListItem button onClick={()=>{props.changeLang(ConstantsMsg.Japanese.LANGUAGE)}}>
                    <ListItemText sx={{fontSize: '2em'}} primary={selector.msg.lang.LANG_JP} />
                </ListItem>
                <Divider />
                <ListItem button onClick={()=>{props.changeLang(ConstantsMsg.Chinese.LANGUAGE)}}>
                    <ListItemText sx={{fontSize: '2em'}} primary={selector.msg.lang.LANG_CN} />
                </ListItem>
            </List>
        </Typography>
    );
}

export default LangComponent;