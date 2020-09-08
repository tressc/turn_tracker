import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({
    lightSource: {
        width: '200px',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column'
    }
});

function Light() {
    const [type, setType] = useState('torch')
    const [carrier, setCarrier] = useState('Anon')
    const [turns, setTurns] = useState(6)
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={classes.lightSource}>
            <MuiAccordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                >
                <MuiAccordionSummary expandIcon={<ExpandMoreIcon />}>
                { `${carrier}'s ${type}: ${turns}` }
                </MuiAccordionSummary>
                <MuiAccordionDetails className={classes.actions}>
                    <div>
                        <IconButton  onClick={() => setTurns(turns - 1)} aria-label="delete" className={classes.margin} size="small">
                            <ArrowDownwardIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton  onClick={() => setTurns(turns + 1)} aria-label="delete" className={classes.margin} size="small">
                            <ArrowUpwardIcon fontSize="inherit" />
                        </IconButton>
                        {/* <Button variant="outlined" onClick={() => setTurns(turns - 1)}>-</Button> */}
                        {/* <Button variant="outlined" onClick={() => setTurns(turns + 1)}>+</Button> */}
                    </div>
                    <TextField placeholder="Anon" onChange={e => setCarrier(e.target.value)} label="Carrier" />
                    <TextField placeholder="torch" onChange={e => setType(e.target.value)} label="Type" />
                </MuiAccordionDetails>
            </MuiAccordion>
        </div>
    )
}

export default Light;