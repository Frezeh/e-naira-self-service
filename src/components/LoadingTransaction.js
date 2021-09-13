import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';

export const LoadingTransaction = () => {
    return (
        <Grid item xs={12} sm={12} md={12}>
            <div style={{ alignContent: "center" }}>
                <CircularProgress />
                <p>Transaction in Progress . . .</p>
                <p>Do not click any button!! 🚫</p>
            </div>
        </Grid>
    );
};