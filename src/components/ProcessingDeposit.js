/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Loading } from './LoadingComponent';
import Typography from '@material-ui/core/Typography';
import { commerceTranxDeposit } from '../redux/ActionCreators';
import { useDispatch, useSelector } from 'react-redux';

export default function Processing() {
    useEffect(() => {
        if (auth.isAuthenticated) {
            dispatch(commerceTranxDeposit())
        }
    }, [])

    const deposit = useSelector(state => state.deposit);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    if (deposit.isLoading) {
        return (
            <Loading />
        );

    } else {
        return (
            <>
            <Typography variant="h5" gutterBottom>
                Your Transaction for {localStorage.getItem('amount')} was {localStorage.getItem('success')}
            </Typography>
            <Typography variant="subtitle1">
                Status: {localStorage.getItem('status')} 
            </Typography>
            { localStorage.getItem('message') 
            ?
            <Typography variant="subtitle1">
                Message: {localStorage.getItem('message')}
            </Typography>
            :
            <Typography variant="subtitle1">
                ReferenceId: {localStorage.getItem('guid')}
            </Typography>            }
            </>
        );
    }
}