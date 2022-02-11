import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles, ModalTitle, PageTitle, Caption, TimeItemName } from '../theme';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SettingComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    return (
        <Typography component="div" align="center">
            <ModalTitle>{selector.msg.lang.SETTING}</ModalTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                <Box component="nav" sx={{ width: '20%', flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                    <Divider />
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemText primary="Spam" />
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: '70%'}}>
                    
                </Box>
            </Box>
        </Typography>
    );
}

export default SettingComponent;