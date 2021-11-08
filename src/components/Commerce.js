/* eslint-disable */
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import toast from 'react-hot-toast';
import { Paper, Typography } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
          Nova Merchant Bank {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        paddingTop: 50
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    }
}));

export default function Commerce() {
    useEffect(() => {
        setTimeout(() => {
            localStorage.clear();
            window.location.reload();
        }, 300000)
        notify();
    }, [])

    const classes = useStyles();

    const notify = () => toast('Your Session would automatially time out after 5 Minutes!', {
        icon: '😳',
        // duration: 4000,
        // position:"bottom-center"
    });

    const Transaction = () => {
        return (
            <>
                <h4>Wallet Balance</h4>
                <h1>₦{localStorage.getItem('balance')}</h1>
                <p></p>
                <p></p>
                <h4>KYC Status</h4>
                <h1>{localStorage.getItem('kyc')}</h1>
                <div style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20, }}>
                    <Link to={{ pathname: '/transactionsdeposit' }}>
                        <button style={{
                            width: '100%',
                            backgroundColor: "#4682B4",
                            padding: 15,
                            justifyContent: "center",
                            marginBottom: 20,
                            borderRadius: 24,
                            color: "white",
                            fontSize: 20
                        }}>
                            Initiate eNaira Transfer
                    </button>
                    </Link>
                </div>
                <div style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20, }}>
                    <Link to={{ pathname: '/transactionswithdrawal' }}>
                            <button style={{
                                width: '100%',
                                backgroundColor: "#4682B4",
                                padding: 15,
                                justifyContent: "center",
                                marginBottom: 20,
                                borderRadius: 24,
                                color: "white",
                                fontSize: 20
                            }}>
                                Initiate bank account Transfer
                            </button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <React.Fragment>
            <NavBar />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: 20 }}>
                        Wallet Information
          </Typography>
                    <React.Fragment>
                        <Transaction />
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}