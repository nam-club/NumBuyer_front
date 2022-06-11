import React from 'react';
import { useSelector } from 'react-redux';

import { TutorialImage, EmphasisMessage } from '../theme';
import * as ConstantsMsg from '../../constantsMsg';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

/** チュートリアルの画像付き説明コンポーネント  */
const TutorialSectionComponent = (props) => {
    const selector = useSelector(state => state);

    return (
        <div>
            {selector.msg.lang === ConstantsMsg.English ?
            <div>
                <EmphasisMessage paragraph sx={{fontSize: "1.4em"}}>
                <b>{props.title}</b>
                </EmphasisMessage>
                <TutorialImage src={props.image}/>
                <Typography sx={{fontSize: "1.2em"}}>
                {props.texts.map((value, index) => (
                    <p key={index}>{value}</p>
                ))}
                </Typography>
                <Divider />
            </div>
            :
            <div>
                <EmphasisMessage paragraph sx={{fontSize: "1.2em"}}>
                <b>{props.title}</b>
                </EmphasisMessage>
                <TutorialImage src={props.image}/>
                <Typography sx={{fontSize: "1em"}}>
                {props.texts.map((value, index) => (
                    <p key={index}>{value}</p>
                ))}
                </Typography>
                <Divider />
            </div>
            }
        </div>
    );
}

export default TutorialSectionComponent;