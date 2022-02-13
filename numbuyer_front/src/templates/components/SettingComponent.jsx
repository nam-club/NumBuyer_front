import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles, ModalTitle, YesButton, SettingHeader } from '../theme';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';

const SettingComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [state, setState] = React.useState({
        multiplication: false,
        division: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Typography component="div" align="center">
            <ModalTitle>{selector.msg.lang.SETTING}</ModalTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                <Box component="nav" sx={{flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                    <FormGroup>
                        <FormControlLabel control={ 
                            <Switch checked={state.multiplication} onChange={handleChange} name="multiplication" />
                        }
                        label={selector.msg.lang.MULTIPLICATION}/>
                        <FormControlLabel control={ 
                            <Switch checked={state.division} onChange={handleChange} name="division" />
                        }
                        label={selector.msg.lang.DIVISION}/>
                    </FormGroup>
                    <Divider />
                    <SettingHeader gutterBottom align="left">{selector.msg.lang.LIMIT}</SettingHeader>
                    <Slider
                        aria-label="Limit of Number"
                        defaultValue={20}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={100}
                    />
                    <YesButton autoFocus>OK</YesButton>
                </Box>
            </Box>
        </Typography>
    );
}

export default SettingComponent;