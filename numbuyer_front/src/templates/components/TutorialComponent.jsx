import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SideBar, PageTitle, Caption, TimeItemName, TutorialBody, TutorialImage, TLButton, EmphasisMessage, DetailMessage } from '../theme';
import * as ConstantsMsg from '../../constantsMsg';
import * as Constants from '../../constants';

import { grey, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';


import whatIsNumBuyer from '../../assets/what_is_numbuyer.png';
import beforeGame1 from '../../assets/before_game1.png';
import beforeGame2 from '../../assets/before_game2.png';
import beforeGame3 from '../../assets/before_game3.png';
import { setTLColorAction, setTPageAction } from '../../redux/msg/actions';

const TutorialComponent = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
 
    // ゲーム紹介項目
    const [introduction, setIntroduction] = React.useState({name: selector.msg.lang.INTRODUCTION, color: selector.msg.tlColor[0].text});

    // タイムライン項目
    const [timeLines, setTimeLines] = React.useState([
        {name: selector.msg.lang.TIME_LINE1, color: selector.msg.tlColor[1].text, dot: selector.msg.tlColor[1].dot},
        {name: selector.msg.lang.TIME_LINE2, color: selector.msg.tlColor[2].text, dot: selector.msg.tlColor[2].dot},
        {name: selector.msg.lang.TIME_LINE3, color: selector.msg.tlColor[3].text, dot: selector.msg.tlColor[3].dot},
        {name: selector.msg.lang.TIME_LINE4, color: selector.msg.tlColor[4].text, dot: selector.msg.tlColor[4].dot},
        {name: selector.msg.lang.ABILITY_TAG, color: selector.msg.tlColor[5].text, dot: selector.msg.tlColor[5].dot},
    ]);

    // タイムラインから説明を読みたい項目を選択
    const selectButton = (name) => {
        switch(name) {
            case selector.msg.lang.INTRODUCTION:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE1));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: blue[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.ABILITY_TAG, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"}
                ]));
                break;
            case selector.msg.lang.TIME_LINE1:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE2));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: blue[700], dot: "primary"},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.ABILITY_TAG, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"}
                ]));
                break;
            case selector.msg.lang.TIME_LINE2:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE3));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE2, color: blue[700], dot: "primary"},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.ABILITY_TAG, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "grey"},
                    {text: grey[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"}
                ]));
                break;
            case selector.msg.lang.TIME_LINE3:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE4));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE3, color: blue[700], dot: "primary"},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.ABILITY_TAG, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"}
                ]));
                break;
            case selector.msg.lang.TIME_LINE4:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE5));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE4, color: blue[700], dot: "primary"},
                    {name: selector.msg.lang.ABILITY_TAG, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "primary"},
                    {text: grey[700], dot: "grey"}
                ]));
                break;
            case selector.msg.lang.ABILITY_TAG:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE6));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.ABILITY_TAG, color: blue[700], dot: "primary"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "primary"}
                ]));
                break;
            default:
                break;
        }
    }

    const createMarginTop = (page) => {
        switch(page) {
            case Constants.T_PAGE1:
                return '20%';
            case Constants.T_PAGE2:
                return '50%';
            default:
                return  "0";
        }
    }

    return (
        <Typography component="div" align="center">
            <Box sx={{ display: 'flex', marginTop: createMarginTop(selector.msg.tPage) }}>
                <SideBar component="nav">
                        {selector.msg.lang === ConstantsMsg.English ?
                        <div>
                            <PageTitle onClick={()=>{selectButton(introduction.name)}} 
                            sx={{fontSize: '1.5em', color: introduction.color}}>
                                {introduction.name}
                            </PageTitle>
                            <Caption sx={{fontSize: '1.2em'}}>{selector.msg.lang.CAPTION}</Caption>
                        </div>
                        :
                        <div>
                            <PageTitle onClick={()=>{selectButton(introduction.name)}} 
                            sx={{fontSize: '1.3em', color: introduction.color}}>
                                {introduction.name}
                            </PageTitle>
                            <Caption sx={{fontSize: '1em'}}>{selector.msg.lang.CAPTION}</Caption>
                        </div>
                        }
                        <Timeline position="left" sx={{padding: 0, margin: 0}}>
                            {timeLines.map((value, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot color={value.dot}/>
                                        {(index !== 0) && (index !== timeLines.length-2) && (index !== timeLines.length-1) && 
                                            <TimelineConnector />
                                        }
                                    </TimelineSeparator>
                                    {selector.msg.lang === ConstantsMsg.English ?
                                        <TimeItemName>
                                            <TLButton onClick={()=>{selectButton(value.name)}} 
                                            sx={{fontSize: "1em", color: value.color}}>
                                                {value.name}
                                            </TLButton>
                                        </TimeItemName>
                                    :
                                        <TimeItemName>
                                            <TLButton onClick={()=>{selectButton(value.name)}} 
                                            sx={{fontSize: "0.8em", color: value.color}}>
                                                {value.name}
                                            </TLButton>
                                        </TimeItemName>
                                    }
                                </TimelineItem>
                            ))}
                            
                        </Timeline>
                </SideBar>
                <TutorialBody component="main">
                    {selector.msg.tPage === Constants.T_PAGE1 ?
                    <div>
                        <TutorialImage src={whatIsNumBuyer}/>
                        {selector.msg.lang === ConstantsMsg.English ?
                        <div>
                            <EmphasisMessage paragraph sx={{fontSize: "1.5em"}}>
                                {selector.msg.lang.INTRODUCTION_MSG1}
                            </EmphasisMessage>
                            <Divider />
                            <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
                                <b>{selector.msg.lang.INTRODUCTION_MSG2}</b>
                            </EmphasisMessage>
                            <Typography sx={{fontSize: "1.2em"}}>
                                <p>{selector.msg.lang.INTRODUCTION_MSG3}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG4}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG5}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG6}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG7}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG8}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG9}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG10}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG11}</p>
                            </Typography>
                        </div>
                        :
                        <div>
                            <EmphasisMessage paragraph sx={{fontSize: "1.2em"}}>
                                {selector.msg.lang.INTRODUCTION_MSG1}
                            </EmphasisMessage>
                            <Divider />
                            <EmphasisMessage paragraph sx={{fontSize: "1.2em"}}>
                                <b>{selector.msg.lang.INTRODUCTION_MSG2}</b>
                            </EmphasisMessage>
                            <Typography sx={{fontSize: "1em"}}>
                                <p>{selector.msg.lang.INTRODUCTION_MSG3}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG4}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG5}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG6}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG7}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG8}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG9}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG10}</p>
                                <p>{selector.msg.lang.INTRODUCTION_MSG11}</p>
                            </Typography>
                        </div>
                        }
                    </div>
                    :
                    <div>
                        {selector.msg.tPage === Constants.T_PAGE2 ?
                        <div>
                            {selector.msg.lang === ConstantsMsg.English ?
                            <div>
                                <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
                                <b>{selector.msg.lang.BEFORE_GAME_MSG1}</b>
                                </EmphasisMessage>
                                <TutorialImage src={beforeGame1}/>
                                <Typography sx={{fontSize: "1.2em"}}>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG2}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG3}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG4}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG5}</p>
                                </Typography>
                                <Divider />
                                <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
                                <b>{selector.msg.lang.BEFORE_GAME_MSG6}</b>
                                </EmphasisMessage>
                                <TutorialImage src={beforeGame2}/>
                                <Typography sx={{fontSize: "1.2em"}}>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG7}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG8}</p>
                                </Typography>
                                <Divider />
                                <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
                                <b>{selector.msg.lang.BEFORE_GAME_MSG9}</b>
                                </EmphasisMessage>
                                <TutorialImage src={beforeGame3}/>
                            </div>
                            :
                            <div>
                                <EmphasisMessage paragraph sx={{fontSize: "1.2em"}}>
                                <b>{selector.msg.lang.BEFORE_GAME_MSG1}</b>
                                </EmphasisMessage>
                                <TutorialImage src={beforeGame1}/>
                                <Typography sx={{fontSize: "1em"}}>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG2}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG3}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG4}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG5}</p>
                                </Typography>
                                <Divider />
                                <EmphasisMessage paragraph sx={{fontSize: "1.2em"}}>
                                <b>{selector.msg.lang.BEFORE_GAME_MSG6}</b>
                                </EmphasisMessage>
                                <TutorialImage src={beforeGame2}/>
                                <Typography sx={{fontSize: "1em"}}>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG7}</p>
                                    <p>{selector.msg.lang.BEFORE_GAME_MSG8}</p>
                                </Typography>
                                <Divider />
                                <EmphasisMessage paragraph sx={{fontSize: "1.2em"}}>
                                <b>{selector.msg.lang.BEFORE_GAME_MSG9}</b>
                                </EmphasisMessage>
                                <TutorialImage src={beforeGame3}/>
                            </div>
                            }
                        </div>
                        :
                        <div>

                        </div>
                        }
                    </div>
                    }
                </TutorialBody>
            </Box>
        </Typography>
    );
}

export default TutorialComponent;