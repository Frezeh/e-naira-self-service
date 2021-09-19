/* eslint-disable */
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import { Loading } from './LoadingComponent';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import Lock from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import { logoutUser } from '../redux/ActionCreators';
import { useDispatch } from 'react-redux';
import Commercedeposit from './CommerceDeposit';
import NavBar from './Navbar';
// import { Link } from 'react-router-dom';

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
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const HandleLogout = () => {
        dispatch(logoutUser());
    }

    const CommerceLanding = () => {
        return <Commercedeposit />
    }

    const Transaction = () => {
        return (
            <>
                <h4>Wallet Balance</h4>
                <h1>₦{localStorage.getItem('balance')}</h1>
                <p></p>
                <p></p>
                <h4>Wallet Type</h4>
                <h1>{localStorage.getItem('type')}</h1>
                <div style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20, }}>
                <Link to={{pathname: '/commercedeposit'}}>
                    <button className="btn btn-md btn-info" style={{
                            width: 500,
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
                <Link to={{pathname: '/commercewithdrawal'}}>
                    <button className="btn btn-md btn-info" style={{
                            width: 500,
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