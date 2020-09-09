import React from 'react';
import Button from '@material-ui/core/Button';
import { useRounds } from './rounds';

function LogBox() {
    const {round, setRound } = useRounds();

    return (
        <div>
            <div>{round}</div>
            <Button onClick={() => setRound(round + 1)}>increment round</Button>
        </div>
    )
}

export default LogBox;