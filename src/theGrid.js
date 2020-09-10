import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useItems } from './items';
import { Button } from '@material-ui/core';

function TheGrid({type}) {
    const { items, addItem } = useItems();

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={() => addItem(type)}>add {type.slice(0, type.length - 1)}</Button>
            <div className="grid">
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <Grid container spacing={1}>
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

