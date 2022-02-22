import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles, SideBar, PageTitle, Caption, TimeItemName, TutorialBody, TutorialImage, TLButton, EmphasisMessage, DetailMessage } from '../theme';

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
            <Box sx={{ display: 'flex' }}>
                <SideBar component="nav">
                        <PageTitle onClick={()=>{selectButton(introduction.name)}} sx={{color: introduction.color}}>
                            {introduction.name}
                        </PageTitle>
                        <Caption>{selector.msg.lang.CAPTION}</Caption>
                        <Timeline position="left" sx={{padding: 0, margin: 0}}>
                            {timeLines.map((value, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        {(index !== 0) && (index !== timeLines.length-1) && 
                                            <TimelineConnector />
                                        }
                                    </TimelineSeparator>
                                    <TimeItemName>
                                        <TLButton onClick={()=>{selectButton(value.name)}} sx={{color: value.color}}>
                                            {value.name}
                                        </TLButton>
                                    </TimeItemName>
                                </TimelineItem>
                            ))}
                        </Timeline>
                </SideBar>
                <TutorialBody component="main">
                    <TutorialImage src={whatIsNumBuyer}/>
                    <EmphasisMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG1}</EmphasisMessage>
                    <Divider />
                    <EmphasisMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG2}</EmphasisMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG3}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG4}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG5}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG6}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG7}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG8}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG9}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG10}</DetailMessage>
                    <DetailMessage paragraph>{selector.msg.lang.INTRODUCTION_MSG11}</DetailMessage>
                </TutorialBody>
            </Box>
        </Typography>
    );
}

export default TutorialComponent;