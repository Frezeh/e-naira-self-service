/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { commerceTranxWithdrawal, merchantTranxWithdrawal } from '../redux/ActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingTransaction } from './LoadingTransaction';

export default function ProcessingWithdrawal() {
    useEffect(() => {
        if (localStorage.getItem('type') === 'Registered User') {
            dispatch(commerceTranxWithdrawal())
        }
        if (localStorage.getItem('type') === 'Registered Merchant') {
            dispatch(merchantTranxWithdrawal())
        }
    }, [])

    const withdrawal = useSelector(state => state.withdrawal);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    if (withdrawal.isLoading) {
        return (
            <LoadingTransaction />
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