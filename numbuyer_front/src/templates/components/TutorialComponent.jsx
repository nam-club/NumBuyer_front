import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles, ModalTitle, PageTitle, Caption, TimeItemName, TutorialImage, TLButton } from '../theme';

import { grey, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';


import whatIsNumBuyer from '../../assets/what_is_numbuyer.png';

const TutorialComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
 
    // ゲーム紹介項目
    const [introduction, setIntroduction] = React.useState({name: selector.msg.lang.INTRODUCTION, color: blue[700]});

    // タイムライン項目
    const [timeLines, setTimeLines] = React.useState([
        {name: selector.msg.lang.TIME_LINE1, color: grey[700]},
        {name: selector.msg.lang.TIME_LINE2, color: grey[700]},
        {name: selector.msg.lang.TIME_LINE3, color: grey[700]},
        {name: selector.msg.lang.TIME_LINE4, color: grey[700]},
    ]);

    const selectButton = (name) => {
        switch(name) {
            case selector.msg.lang.INTRODUCTION:
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: blue[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700]},
                ]);
                break;
            case selector.msg.lang.TIME_LINE1:
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: blue[700]},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700]},
                ]);
                break;
            case selector.msg.lang.TIME_LINE2:
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE2, color: blue[700]},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700]},
                ]);
                break;
            case selector.msg.lang.TIME_LINE3:
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE3, color: blue[700]},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700]},
                ]);
                break;
            case selector.msg.lang.TIME_LINE4:
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700]},
                    {name: selector.msg.lang.TIME_LINE4, color: blue[700]},
                ]);
                break;
            default:
                break;
        }
    }

    return (
        <Typography component="div" align="center">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                <Box component="nav" sx={{ width: '20%', flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                    <Divider />
                        <PageTitle onClick={()=>{selectButton(introduction.name)}} sx={{color: introduction.color}}>
                            {introduction.name}
                        </PageTitle>
                        <Caption>{selector.msg.lang.CAPTION}</Caption>
                        <Timeline position="left" sx={{padding: 0, margin: 0}}>
                            {timeLines.map((value, index) => (
                                <TimelineItem>
                                    <TimelineSeparator>
                                    <TimelineDot />
                                    </TimelineSeparator>
                                    <TimeItemName>
                                        <TLButton onClick={()=>{selectButton(value.name)}} sx={{color: value.color}}>
                                            {value.name}
                                        </TLButton>
                                    </TimeItemName>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    <Divider />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: '70%'}}>
                    <TutorialImage src={whatIsNumBuyer}/>
                    <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            </Box>
        </Typography>
    );
}

export default TutorialComponent;