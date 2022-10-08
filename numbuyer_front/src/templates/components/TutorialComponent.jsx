import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SideBar, PageTitle, Caption, TimeItemName, TutorialBody, TutorialImage, TLButton, EmphasisMessage } from '../theme';
import { PageTitleMobile, CaptionMobile, TLButtonMobile } from '../themeMobile';
import * as ConstantsMsg from '../../constantsMsg';
import * as Constants from '../../constants';
import TutorialSectionComponent from './TutorialSectionComponent';

import { grey, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useMediaQuery } from "@mui/material";

import whatIsNumBuyer from '../../assets/what_is_numbuyer.png';
import beforeGame1 from '../../assets/before_game1.png';
import beforeGame2 from '../../assets/before_game2.png';
import beforeGame3 from '../../assets/before_game3.png';
import beforeGame4 from '../../assets/before_game4.png';
import beforeGame5 from '../../assets/before_game5.png';
import distribution1 from '../../assets/distribution1.png';
import distribution2 from '../../assets/distribution2.png';
import distribution3 from '../../assets/distribution3.png';
import auction1 from '../../assets/auction1.png';
import auction2 from '../../assets/auction2.png';
import auction3 from '../../assets/auction3.png';
import auction4 from '../../assets/auction4.png';
import calculation1 from '../../assets/calculation1.png';
import calculation2 from '../../assets/calculation2.png';
import calculation3 from '../../assets/calculation3.png';
import calculation4 from '../../assets/calculation4.png';
import useAbilities1 from '../../assets/use_abilities1.png';
import useAbilities2 from '../../assets/use_abilities2.png';
import useAbilities3 from '../../assets/use_abilities3.png';
import useAbilities4 from '../../assets/use_abilities4.png';
import endGame1 from '../../assets/end_game1.png';
import whatIsNumBuyerMobile from '../../assets/what_is_numbuyer_mobile.png';
import beforeGame1Mobile from '../../assets/before_game1_mobile.png';
import beforeGame2Mobile from '../../assets/before_game2_mobile.png';
import beforeGame3Mobile from '../../assets/before_game3_mobile.png';
import beforeGame4Mobile from '../../assets/before_game4_mobile.png';
import beforeGame5Mobile from '../../assets/before_game5_mobile.png';
import distribution1Mobile from '../../assets/distribution1_mobile.png';
import distribution2Mobile from '../../assets/distribution2_mobile.png';
import distribution3Mobile from '../../assets/distribution3_mobile.png';
import auction1Mobile from '../../assets/auction1_mobile.png';
import auction2Mobile from '../../assets/auction2_mobile.png';
import auction3Mobile from '../../assets/auction3_mobile.png';
import auction4Mobile from '../../assets/auction4_mobile.png';
import calculation1Mobile from '../../assets/calculation1_mobile.png';
import calculation2Mobile from '../../assets/calculation2_mobile.png';
import calculation3Mobile from '../../assets/calculation3_mobile.png';
import calculation4Mobile from '../../assets/calculation4_mobile.png';
import useAbilities1Mobile from '../../assets/use_abilities1_mobile.png';
import useAbilities2Mobile from '../../assets/use_abilities2_mobile.png';
import useAbilities3Mobile from '../../assets/use_abilities3_mobile.png';
import useAbilities4Mobile from '../../assets/use_abilities4_mobile.png';
import endGame1Mobile from '../../assets/end_game1_mobile.png';
import { setTLColorAction, setTPageAction } from '../../redux/msg/actions';

/** チュートリアル全体 */
const TutorialComponent = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const matches = useMediaQuery("(min-width:520px)");
 
    // ゲーム紹介項目
    const [introduction, setIntroduction] = React.useState({name: selector.msg.lang.INTRODUCTION, color: selector.msg.tlColor[0].text});

    // タイムライン項目
    const [timeLines, setTimeLines] = React.useState([
        {name: selector.msg.lang.TIME_LINE1, color: selector.msg.tlColor[1].text, dot: selector.msg.tlColor[1].dot},
        {name: selector.msg.lang.TIME_LINE2, color: selector.msg.tlColor[2].text, dot: selector.msg.tlColor[2].dot},
        {name: selector.msg.lang.TIME_LINE3, color: selector.msg.tlColor[3].text, dot: selector.msg.tlColor[3].dot},
        {name: selector.msg.lang.TIME_LINE4, color: selector.msg.tlColor[4].text, dot: selector.msg.tlColor[4].dot},
        {name: selector.msg.lang.ABILITY_TAG, color: selector.msg.tlColor[5].text, dot: selector.msg.tlColor[5].dot},
        {name: selector.msg.lang.TIME_LINE5, color: selector.msg.tlColor[6].text, dot: selector.msg.tlColor[6].dot},
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
                    {name: selector.msg.lang.TIME_LINE5, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
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
                    {name: selector.msg.lang.TIME_LINE5, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
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
                    {name: selector.msg.lang.TIME_LINE5, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
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
                    {name: selector.msg.lang.TIME_LINE5, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
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
                    {name: selector.msg.lang.TIME_LINE5, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"},
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
                    {name: selector.msg.lang.TIME_LINE5, color: grey[700], dot: "grey"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"},
                    {text: grey[700], dot: "grey"}
                ]));
                break;
            case selector.msg.lang.TIME_LINE5:
                // ページを変更する
                dispatch(setTPageAction(Constants.T_PAGE7));
                // 選択項目に色をつける
                setIntroduction({name: selector.msg.lang.INTRODUCTION, color: grey[700]});
                setTimeLines([
                    {name: selector.msg.lang.TIME_LINE1, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE2, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE3, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE4, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.ABILITY_TAG, color: grey[700], dot: "grey"},
                    {name: selector.msg.lang.TIME_LINE5, color: blue[700], dot: "primary"},
                ]);
                // storeにもタイムラインの色を反映
                dispatch(setTLColorAction([
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: grey[700], dot: "grey"},
                    {text: blue[700], dot: "primary"}
                ]));
                break;
            default:
                break;
        }
    }

    const createMarginTop = (page) => {
        if(matches) {
            switch(page) {
                case Constants.T_PAGE1:
                    return '18%';
                case Constants.T_PAGE2:
                    return '150%';
                case Constants.T_PAGE3:
                    return '47%';
                case Constants.T_PAGE4:
                    return '76%';
                case Constants.T_PAGE5:
                    return '74%';
                case Constants.T_PAGE6:
                    return '82%';
                case Constants.T_PAGE7:
                    return '0';
                default:
                    return  "0";
            }
        }else {
            switch(page) {
                case Constants.T_PAGE1:
                    return '240%';
                case Constants.T_PAGE2:
                    return '654%';
                case Constants.T_PAGE3:
                    return '282%';
                case Constants.T_PAGE4:
                    return '423%';
                case Constants.T_PAGE5:
                    return '412%';
                case Constants.T_PAGE6:
                    return '404%';
                case Constants.T_PAGE7:
                    return '1%';
                default:
                    return  "0";
            }
        }
    }

    return (
        <Typography component="div" align="center">
        {matches ? 
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
                                        {(index !== 0) && (index !== timeLines.length-3) && (index !== timeLines.length-2) && (index !== timeLines.length-1) && 
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
                            <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
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
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG1}
                                image={beforeGame1}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG2,
                                    selector.msg.lang.BEFORE_GAME_MSG3,
                                    selector.msg.lang.BEFORE_GAME_MSG4,
                                    selector.msg.lang.BEFORE_GAME_MSG5
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG6}
                                image={beforeGame2}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG7,
                                    selector.msg.lang.BEFORE_GAME_MSG8,
                                    selector.msg.lang.ABILITY_EXP1,
                                    selector.msg.lang.ABILITY_EXP2
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG9}
                                image={beforeGame3}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG10,
                                    selector.msg.lang.BEFORE_GAME_MSG11,
                                    selector.msg.lang.BEFORE_GAME_MSG12
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG13}
                                image={beforeGame4}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG14,
                                    selector.msg.lang.BEFORE_GAME_MSG15,
                                    selector.msg.lang.BEFORE_GAME_MSG16,
                                    selector.msg.lang.BEFORE_GAME_MSG17
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG18}
                                image={beforeGame5}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG19,
                                    selector.msg.lang.BEFORE_GAME_MSG20,
                                    selector.msg.lang.BEFORE_GAME_MSG15
                                ]}>
                            </TutorialSectionComponent>
                        </div>
                        :
                        <div>
                            {selector.msg.tPage === Constants.T_PAGE3 ?
                            <div>
                                <TutorialSectionComponent
                                    title={selector.msg.lang.DISTRIBUTION_MSG1}
                                    image={distribution1}
                                    texts={[
                                        selector.msg.lang.DISTRIBUTION_MSG1_1,
                                        selector.msg.lang.DISTRIBUTION_MSG2,
                                        selector.msg.lang.DISTRIBUTION_MSG3,
                                        selector.msg.lang.DISTRIBUTION_MSG4
                                    ]}>
                                </TutorialSectionComponent>
                                <TutorialSectionComponent
                                    title={selector.msg.lang.DISTRIBUTION_MSG5}
                                    image={distribution2}
                                    texts={[
                                        selector.msg.lang.DISTRIBUTION_MSG6,
                                        selector.msg.lang.DISTRIBUTION_MSG7
                                    ]}>
                                </TutorialSectionComponent>
                                <TutorialSectionComponent
                                    title={selector.msg.lang.DISTRIBUTION_MSG8}
                                    image={distribution3}
                                    texts={[
                                        selector.msg.lang.DISTRIBUTION_MSG9
                                    ]}>
                                </TutorialSectionComponent>
                            </div>
                            :
                            <div>
                                {selector.msg.tPage === Constants.T_PAGE4 ?
                                <div>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG1}
                                        image={auction1}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG2
                                        ]}>
                                    </TutorialSectionComponent>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG3}
                                        image={auction2}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG4,
                                            selector.msg.lang.AUCTION_PHASE_MSG5,
                                            selector.msg.lang.AUCTION_PHASE_MSG6,
                                            selector.msg.lang.AUCTION_PHASE_MSG7
                                        ]}>
                                    </TutorialSectionComponent>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG8}
                                        image={auction3}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG9
                                        ]}>
                                    </TutorialSectionComponent>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG10}
                                        image={auction4}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG11
                                        ]}>
                                    </TutorialSectionComponent>
                                </div>
                                :
                                <div>
                                    {selector.msg.tPage === Constants.T_PAGE5 ?
                                    <div>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG1}
                                            image={calculation1}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG2,
                                                selector.msg.lang.CALCULATION_PHASE_MSG3,
                                            ]}>
                                        </TutorialSectionComponent>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG4}
                                            image={calculation2}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG5
                                            ]}>
                                        </TutorialSectionComponent>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG6}
                                            image={calculation3}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG7
                                            ]}>
                                        </TutorialSectionComponent>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG8}
                                            image={calculation4}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG9,
                                                selector.msg.lang.CALCULATION_PHASE_MSG10
                                            ]}>
                                        </TutorialSectionComponent>
                                    </div>
                                    :
                                    <div>
                                        {selector.msg.tPage === Constants.T_PAGE6 ?
                                        <div>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG1}
                                                image={useAbilities1}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG2,
                                                    selector.msg.lang.USE_ABILITIES_MSG3,
                                                ]}>
                                            </TutorialSectionComponent>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG4}
                                                image={useAbilities2}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG5
                                                ]}>
                                            </TutorialSectionComponent>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG6}
                                                image={useAbilities3}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG7,
                                                    selector.msg.lang.USE_ABILITIES_MSG8
                                                ]}>
                                            </TutorialSectionComponent>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG9}
                                                image={useAbilities4}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG10,
                                                    selector.msg.lang.USE_ABILITIES_MSG7,
                                                    selector.msg.lang.USE_ABILITIES_MSG8
                                                ]}>
                                            </TutorialSectionComponent>
                                        </div>
                                        :
                                        <div>
                                            {selector.msg.tPage === Constants.T_PAGE7 ?
                                            <div>
                                                <TutorialSectionComponent
                                                    title={selector.msg.lang.END_GAME_MSG1}
                                                    image={endGame1}
                                                    texts={[
                                                        selector.msg.lang.END_GAME_MSG2,
                                                        selector.msg.lang.END_GAME_MSG3,
                                                    ]}>
                                                </TutorialSectionComponent>
                                            </div>
                                            :
                                            <div></div>
                                            }
                                        </div>
                                        }
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                            }
                        </div>
                        }
                    </div>
                    }
                </TutorialBody>
            </Box>
        :
            <Box sx={{ display: 'flex', marginTop: createMarginTop(selector.msg.tPage) }}>
                <TutorialBody component="main">
                    {selector.msg.lang === ConstantsMsg.English ?
                    <div>
                        <PageTitleMobile onClick={()=>{selectButton(introduction.name)}} 
                        sx={{fontSize: '1.5em', color: 'white'}}>
                            {introduction.name}
                        </PageTitleMobile>
                        <CaptionMobile sx={{fontSize: '2em'}}>{selector.msg.lang.CAPTION}</CaptionMobile>
                    </div>
                    :
                    <div>
                        <PageTitleMobile onClick={()=>{selectButton(introduction.name)}} 
                        sx={{fontSize: '1.3em', color: 'white'}}>
                            {introduction.name}
                        </PageTitleMobile>
                        <CaptionMobile sx={{fontSize: '1.5em'}}>{selector.msg.lang.CAPTION}</CaptionMobile>
                    </div>
                    }
                    {selector.msg.lang === ConstantsMsg.English ?
                    <div>
                        {timeLines.map((value, index) => (
                            <TLButtonMobile onClick={()=>{selectButton(value.name)}} 
                            sx={{fontSize: "1em", color: 'white'}} key={index}>
                                {value.name}
                                <DoubleArrowIcon />
                            </TLButtonMobile>
                        ))}
                    </div>
                    :
                    <div>
                        {timeLines.map((value, index) => (
                            <TLButtonMobile onClick={()=>{selectButton(value.name)}} 
                            sx={{fontSize: "0.8em", color: 'white'}} key={index}>
                                {value.name}
                                <DoubleArrowIcon />
                            </TLButtonMobile>
                        ))}
                    </div>
                    }
                    {selector.msg.tPage === Constants.T_PAGE1 ?
                    <div>
                        <Divider />
                        <TutorialImage src={whatIsNumBuyerMobile}/>
                        {selector.msg.lang === ConstantsMsg.English ?
                        <div>
                            <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
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
                            <Divider />
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
                            <Divider />
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG1}
                                image={beforeGame1Mobile}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG2,
                                    selector.msg.lang.BEFORE_GAME_MSG3,
                                    selector.msg.lang.BEFORE_GAME_MSG4,
                                    selector.msg.lang.BEFORE_GAME_MSG5
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG6}
                                image={beforeGame2Mobile}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG7,
                                    selector.msg.lang.BEFORE_GAME_MSG8,
                                    selector.msg.lang.ABILITY_EXP1,
                                    selector.msg.lang.ABILITY_EXP2
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG9}
                                image={beforeGame3Mobile}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG10,
                                    selector.msg.lang.BEFORE_GAME_MSG11,
                                    selector.msg.lang.BEFORE_GAME_MSG12
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG13}
                                image={beforeGame4Mobile}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG14,
                                    selector.msg.lang.BEFORE_GAME_MSG15,
                                    selector.msg.lang.BEFORE_GAME_MSG16,
                                    selector.msg.lang.BEFORE_GAME_MSG17
                                ]}>
                            </TutorialSectionComponent>
                            <TutorialSectionComponent
                                title={selector.msg.lang.BEFORE_GAME_MSG18}
                                image={beforeGame5Mobile}
                                texts={[
                                    selector.msg.lang.BEFORE_GAME_MSG19,
                                    selector.msg.lang.BEFORE_GAME_MSG20,
                                    selector.msg.lang.BEFORE_GAME_MSG15
                                ]}>
                            </TutorialSectionComponent>
                        </div>
                        :
                        <div>
                            {selector.msg.tPage === Constants.T_PAGE3 ?
                            <div>
                                <Divider />
                                <TutorialSectionComponent
                                    title={selector.msg.lang.DISTRIBUTION_MSG1}
                                    image={distribution1Mobile}
                                    texts={[
                                        selector.msg.lang.DISTRIBUTION_MSG1_1,
                                        selector.msg.lang.DISTRIBUTION_MSG2,
                                        selector.msg.lang.DISTRIBUTION_MSG3,
                                        selector.msg.lang.DISTRIBUTION_MSG4
                                    ]}>
                                </TutorialSectionComponent>
                                <TutorialSectionComponent
                                    title={selector.msg.lang.DISTRIBUTION_MSG5}
                                    image={distribution2Mobile}
                                    texts={[
                                        selector.msg.lang.DISTRIBUTION_MSG6,
                                        selector.msg.lang.DISTRIBUTION_MSG7
                                    ]}>
                                </TutorialSectionComponent>
                                <TutorialSectionComponent
                                    title={selector.msg.lang.DISTRIBUTION_MSG8}
                                    image={distribution3Mobile}
                                    texts={[
                                        selector.msg.lang.DISTRIBUTION_MSG9
                                    ]}>
                                </TutorialSectionComponent>
                            </div>
                            :
                            <div>
                                {selector.msg.tPage === Constants.T_PAGE4 ?
                                <div>
                                    <Divider />
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG1}
                                        image={auction1Mobile}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG2
                                        ]}>
                                    </TutorialSectionComponent>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG3}
                                        image={auction2Mobile}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG4,
                                            selector.msg.lang.AUCTION_PHASE_MSG5,
                                            selector.msg.lang.AUCTION_PHASE_MSG6,
                                            selector.msg.lang.AUCTION_PHASE_MSG7
                                        ]}>
                                    </TutorialSectionComponent>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG8}
                                        image={auction3Mobile}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG9
                                        ]}>
                                    </TutorialSectionComponent>
                                    <TutorialSectionComponent
                                        title={selector.msg.lang.AUCTION_PHASE_MSG10}
                                        image={auction4Mobile}
                                        texts={[
                                            selector.msg.lang.AUCTION_PHASE_MSG11
                                        ]}>
                                    </TutorialSectionComponent>
                                </div>
                                :
                                <div>
                                    {selector.msg.tPage === Constants.T_PAGE5 ?
                                    <div>
                                        <Divider />
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG1}
                                            image={calculation1Mobile}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG2,
                                                selector.msg.lang.CALCULATION_PHASE_MSG3,
                                            ]}>
                                        </TutorialSectionComponent>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG4}
                                            image={calculation2Mobile}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG5
                                            ]}>
                                        </TutorialSectionComponent>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG6}
                                            image={calculation3Mobile}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG7
                                            ]}>
                                        </TutorialSectionComponent>
                                        <TutorialSectionComponent
                                            title={selector.msg.lang.CALCULATION_PHASE_MSG8}
                                            image={calculation4Mobile}
                                            texts={[
                                                selector.msg.lang.CALCULATION_PHASE_MSG9,
                                                selector.msg.lang.CALCULATION_PHASE_MSG10
                                            ]}>
                                        </TutorialSectionComponent>
                                    </div>
                                    :
                                    <div>
                                        {selector.msg.tPage === Constants.T_PAGE6 ?
                                        <div>
                                            <Divider />
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG1}
                                                image={useAbilities1Mobile}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG2_MOBILE,
                                                    selector.msg.lang.USE_ABILITIES_MSG3,
                                                ]}>
                                            </TutorialSectionComponent>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG4}
                                                image={useAbilities2Mobile}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG5_MOBILE
                                                ]}>
                                            </TutorialSectionComponent>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG6}
                                                image={useAbilities3Mobile}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG7,
                                                    selector.msg.lang.USE_ABILITIES_MSG8
                                                ]}>
                                            </TutorialSectionComponent>
                                            <TutorialSectionComponent
                                                title={selector.msg.lang.USE_ABILITIES_MSG9}
                                                image={useAbilities4Mobile}
                                                texts={[
                                                    selector.msg.lang.USE_ABILITIES_MSG10,
                                                    selector.msg.lang.USE_ABILITIES_MSG7,
                                                    selector.msg.lang.USE_ABILITIES_MSG8
                                                ]}>
                                            </TutorialSectionComponent>
                                        </div>
                                        :
                                        <div>
                                            {selector.msg.tPage === Constants.T_PAGE7 ?
                                            <div>
                                                <Divider />
                                                <TutorialSectionComponent
                                                    title={selector.msg.lang.END_GAME_MSG1}
                                                    image={endGame1Mobile}
                                                    texts={[
                                                        selector.msg.lang.END_GAME_MSG2,
                                                        selector.msg.lang.END_GAME_MSG3,
                                                    ]}>
                                                </TutorialSectionComponent>
                                            </div>
                                            :
                                            <div></div>
                                            }
                                        </div>
                                        }
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                            }
                        </div>
                        }
                    </div>
                    }
                </TutorialBody>
            </Box>
            }
        </Typography>
    );
}

export default TutorialComponent;