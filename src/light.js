import React, { useState, useEffect, useRef } from 'react';
import { useItems } from './items';
import { useRounds } from './rounds';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Popover from '@material-ui/core/Popover';
import SettingsIcon from '@material-ui/icons/Settings';
import Paper from '@material-ui/core/Paper';
import { useLogger } from './logger';



function Light({ id }) {
    const [type, setType] = useState('torch')
    const [carrier, setCarrier] = useState('Anon')
    const [turns, setTurns] = useState(6)
    const didMountRef = useRef(false);

    const { removeItem } = useItems();
    const { round } = useRounds();
    const { updateLogger } = useLogger();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogEntry = () => {
        updateLogger(`${carrier}'s ${type} went out`);
    }

    useEffect(() => {
        if (didMountRef.current) {
            handleDecrement();
        } else {
            didMountRef.current = true;
        }
      }, [round])

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDecrement = () => {
        if (turns === 1) {
            removeItem("lights", id)
            handleLogEntry();
        } else {
            setTurns(turns - 1);
        }
    }

    const handleIncrement = () => {
        if (turns <= 98) {
            setTurns(turns + 1);
        }
    }

    const open = Boolean(anchorEl);
    const popoverId = open ? 'simple-popover' : null;

    return (
        <div>

            <Paper className={"item"} onClick={handleOpen}>
                {`${carrier}'s ${type}: ${turns}`}
            </Paper>
            <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="actions">
                    <div>
                        <IconButton onClick={handleDecrement} aria-label="delete" size="small">
                            <ArrowDownwardIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton onClick={handleIncrement} aria-label="delete" size="small">
                            <ArrowUpwardIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <TextField placeholder="Anon" onChange={e => {
                        setCarrier(e.target.value)
                    }} label="Carrier" />
                    <TextField placeholder="torch" onChange={e => setType(e.target.value)} label="Type" />
                    <div>
                        <IconButton onClick={() => removeItem("lights", id)} aria-label="delete" size="small">
                            <DeleteForeverIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default Light;