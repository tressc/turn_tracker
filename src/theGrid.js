import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useItems } from './items';
import { Button } from '@material-ui/core';

function TheGrid({type}) {
    const { items, addItem } = useItems();

    return (
        <div>
            <Button onClick={() => addItem(type)}>add {type.slice(0, type.length - 1)}</Button>
            <div style={{width: '80%', border: `3px solid ${type === 'lights' ? 'orange' : 'green'}`, margin: '20px', padding: '10px'}}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <Grid container justify="center" spacing={1}>
                    {items[type].map((value) => (
                    <Grid key={value.id} item>
                        {value.item}
                    </Grid>
                    ))}
                </Grid>
                </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default TheGrid;

