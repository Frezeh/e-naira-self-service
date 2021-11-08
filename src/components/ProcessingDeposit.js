/* eslint-disable */
import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { commerceTranxDeposit, merchantTranxDeposit } from '../redux/ActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingTransaction } from './LoadingTransaction';

export default function Processing() {
    useEffect(() => {
        if (localStorage.getItem('type') === 'Registered User') {
            dispatch(commerceTranxDeposit())
        }
        if (localStorage.getItem('type') === 'Registered Merchant') {
            dispatch(merchantTranxDeposit())
        }
    }, [])

    const deposit = useSelector(state => state.deposit);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    if (deposit.isLoading) {
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
            </Typography>            
            }
            </>
        );
    }
}