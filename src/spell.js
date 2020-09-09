import React, { useState, useEffect, useRef } from 'react';
import { useItems } from './items';
import { useRounds } from './rounds';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Popover from '@material-ui/core/Popover';
import SettingsIcon from '@material-ui/icons/Settings';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    spell: {
        width: '200px',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

function Spell({ id }) {
    const [type, setType] = useState('Sleep');
    const [caster, setCaster] = useState('Anon');
    const [targets, setTargets] = useState('Orc1, Orc2, Orc3');
    const [turns, setTurns] = useState(6);
    const didMountRef = useRef(false);
    const classes = useStyles();

    const { removeItem } = useItems();
    const { round } = useRounds();

    const [anchorEl, setAnchorEl] = React.useState(null);

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
            removeItem("spells", id)
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
            <Paper className={classes.spell}>
                {`${caster}'s ${type} spell: ${turns}`}
                <IconButton onClick={handleOpen} aria-label="delete" className={classes.margin} size="small">
                    <SettingsIcon fontSize="inherit" />
                </IconButton>
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
                <div className={classes.actions}>
                    <div>
                        <IconButton onClick={handleDecrement} aria-label="delete" className={classes.margin} size="small">
                            <ArrowDownwardIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton onClick={handleIncrement} aria-label="delete" className={classes.margin} size="small">
                            <ArrowUpwardIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <TextField placeholder="Anon" onChange={e => {
                        setCaster(e.target.value)
                    }} label="Caster" />
                    <TextField placeholder="Sleep" onChange={e => setType(e.target.value)} label="Type" />
                    <TextField placeholder="Orc 1, Orc 2, Orc 3" onChange={e => setTargets(e.target.value)} label="Targets" />
                    <div>
                        <IconButton onClick={() => removeItem("spell", id)} aria-label="delete" className={classes.margin} size="small">
                            <DeleteForeverIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default Spell;