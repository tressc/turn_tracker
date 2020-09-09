import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useRounds } from './rounds';
import { useLogger } from './logger';

function LogBox() {
    const {round, setRound } = useRounds();
    const { logger, updateLogger } = useLogger();

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

    const handleRound = () => {
        updateLogger(`ROUND ${round + 1}`)
        setRound(round + 1)
    }

    return (
        <div>
            <div>{round}</div>
            <Button onClick={handleRound}>increment round</Button>
            <div className="logbox">
                {logger.map(line => <span>{line}</span>)}
                <div ref={logBottom} />
            </div>
        </div>
    )
}

export default LogBox;