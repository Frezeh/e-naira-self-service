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
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


const GET_Login = `
  query ($input: UsernameLoginUserInput!) {
    login(input: $input) {
        token 
        alias 
        needsPasswordReset
    }
  }
`;

const GET_Merchant = `
  query { 
    getMerchantWallet{
        balance 
        guid 
        label
        published
        alias
        withdrawalPreauthExpiry
        withdrawalPreauthState
    }
  }
`;

const login = 'https://api.demo.bittcbdc.com/merchant/login/graphql';
const commerce = 'https://api.demo.bittcbdc.com/merchant/graphql';

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
    appBar: {
        position: 'relative',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default function MLanding() {
    // useEffect(() => {
    //     setTimeout(() => {
    //         history.push("/");
    //       localStorage.clear();
    //     }, 120000)
    //   })

    const [serverResponse, setResponse] = useState([]);
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const creds = location.state;

    const handleLogout = () => {
        history.push("/");
        localStorage.clear();
    }

    const Transaction = () => {
        return (
            <>
                <h4>Wallet Balance</h4>
                <h1>₦{serverResponse.getMerchantWallet.balance}</h1>
                <p></p>
                <p></p>
                <h4>Wallet Address</h4>
                <h1>{serverResponse.getMerchantWallet.alias}</h1>
                <div style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20, }}>
                <Link to={{pathname:'/merchantdepo'}}>
                <button className="btn btn-md btn-info" style={{
                        width: 500,
                        backgroundColor: "#4682B4",
                        padding: 15,
                        justifyContent: "center",
                        marginBottom: 20,
                        borderRadius: 24,
                        color:"white",
                        fontSize: 20
                    }}>
                       Initiate eNaira Transfer
                </button>
              </Link>                 
                </div>
                <div style={{ justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20, }}>
                <Link to={{pathname:'/merchanttrans'}}>
                    <button className="btn btn-md btn-info" style={{
                        width: 500,
                        backgroundColor: "#4682B4",
                        padding: 15,
                        justifyContent: "center",
                        marginBottom: 20,
                        borderRadius: 24,
                        color:"white",
                        fontSize: 20
                    }}>
                       Initiate bank account Transfer
                </button>
                </Link>                 
                </div>
            </>
        );
    }
  
    // const input = { "email": `${localStorage.getItem('userEmail')}`, "password": `${localStorage.getItem('userPassword')}` }
    const input = { "username": `${creds.email}`, "password": `${creds.password}` }
    // localStorage.setItem('decode', JSON.stringify(jwt_decode(localStorage.getItem('commerceToken'))))
    const { data, isLoading, error } = useQuery('login', () => {
        return fetch(login, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: GET_Login, variables: { input } })
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Error fetching data");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                localStorage.setItem('merchantToken', data.data.login.token)
                localStorage.setItem('merchantdecode', JSON.stringify(jwt_decode(localStorage.getItem('merchantToken'))))
                // const userID = localStorage.setItem('decode')
                const bearer = 'Bearer ' + localStorage.getItem('merchantToken');
                return fetch(commerce, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": bearer
                    },
                    body: JSON.stringify({ query: GET_Merchant })
                })
                    .then((response) => {
                        if (response.status >= 400) {
                            throw new Error("Error fetching data");
                        } else {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        setResponse(data.data)
                    });
            });
    });
  
    if (isLoading) return <Loading />;
    if (error) return <pre>{error.message}</pre>;    

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar >
                    <Typography variant="h6" color="inherit" noWrap>
                        eNaira Merchant Portal
                    </Typography>
                    <IconButton color="inherit" edge="end" className={classes.toolbar} onClick={handleLogout}>
                        <Lock />
                    </IconButton>
                </Toolbar>
            </AppBar>
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