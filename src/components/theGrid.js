import React from 'react';
import Light from './light';
import Grid from '@material-ui/core/Grid';

function TheGrid() {
    return (
        <div>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <Grid container justify="center" spacing={1}>
                {[...new Array(20)].map((_value, index) => (
                <Grid key={index} item>
                    <Light />
                </Grid>
                ))}
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default TheGrid;

