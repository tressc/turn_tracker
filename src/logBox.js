import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useRounds } from './rounds';
import { useLogger } from './logger';

function LogBox() {
    const {round, setRound } = useRounds();
    const { logger, loggerOptions, updateLogger } = useLogger();

    const logBottom = useRef(null);
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef) {
            scrollToBottom()
        } else {
            didMountRef.current = true;
        }
    }, [logger])
    
    const scrollToBottom = () => {
        logBottom.current.scrollIntoView({ behavior: "smooth" })
    }

    const rolld6 = (multiplier=1) => {
        let sum = 0;
        for (let i = 0; i < multiplier; i++) {
            sum += Math.floor(Math.random() * 6) + 1
        }
        return  sum;
    }

    const handleRound = () => {
        const newRound = round + 1
        updateLogger(`ROUND ${newRound}`)
        if (newRound % 2 === 0) {
            rollEncounterDie();
        }

        setRound(newRound)
    }

    const rollEncounterDie = () => {
        const wandering = rolld6()
        switch(wandering) {
            case 1:
                const distance = rolld6(2) * 10;
                updateLogger(`Wandering monsters ${distance} feet away. Consult table or see recent clue.`)
                break;
            case 2:
                updateLogger(loggerOptions[String(2)])
                break;
            case 3:
                updateLogger(loggerOptions[String(3)])
                break;
            case 4:
                updateLogger(loggerOptions[String(4)])
                break;
            case 5:
                updateLogger(loggerOptions[String(5)])
                break;
            case 6:
                updateLogger(loggerOptions[String(6)])
                break;
            default:
                break;
        }
    }


    return (
        <div >
            <div >{round}</div>
            <Button variant="outlined" color="secondary" onClick={handleRound}>next round</Button>
            <div className="logbox">
                {logger.map(line => {
                    let lineClass;
                    if (line.includes('ROUND')) {
                        lineClass = 'round-header'
                    } else {
                        lineClass = 'round-info'
                    }
                    return (<span className={lineClass}>{line}</span>)
                })}
                <div ref={logBottom} />
            </div>
        </div>
    )
}

export default LogBox;