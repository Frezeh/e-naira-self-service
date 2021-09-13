/* eslint-disable */
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useQuery, useMutation } from "react-query";
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
import { LoadingTransaction } from '../components/LoadingTransaction';

const GET_Login = `
  query ($input: LoginUserInput!) {
    Login(input: $input) {
        token
        mfaCodeRequired
        refreshToken
    }
  }
`;
//getEmployeeDetails(guid: $employee)
//variables: 'employee'
// 01EYS8SA1YGH3137K317DNBJ53
const GET_Employee_Detail = `
    query { 
        getEmployeeDetails(guid: \"01EYS8SA1YGH3137K317DNBJ53\") { 
            branchGuid 
        } 
    }
`;
//01FEPC94ZSS7T8PHNTGT65HXC7
const GET_Branch_Detail = `
    query { 
        retrieveBranchDetails(guid: $branch) { 
            branchName 
            branchWallet { 
                balance 
                guid 
            } 
        }
    }
`;

const Create__Commerce_Withdrawal_Request = `
    mutation createCommerceWithdrawalRequest($request: WithdrawalRequest!) { 
        createCommerceWithdrawalRequest(request: $request) { 
            id 
            amount 
            currencyCode 
            currentState 
            commerceWithdrawal { 
                guid 
            } 
            insertedAt 
            updatedAt
        } 
    }
`;

const Enable_Withdrawal = `
    mutation ($input: EnableWithdrawInput!) { 
        enableWithdrawal(input: $input) { 
            state 
            expiry 
        }
    }
`;

const uri = 'https://api.demo.bittcbdc.com/organization/login/graphql';
const fi = 'https://api.demo.bittcbdc.com/organization/graphql';
const enable = 'https://api.demo.bittcbdc.com/commerce/graphql';

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

export default function MTrans() {
    // useEffect(() => {
    //     setTimeout(() => {
    //         history.push("/");
    //       localStorage.clear();
    //     }, 120000)
    //   })
     
    const [serverResponse, setResponse] = useState([]);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    const history = useHistory();
    const creds = location.state;
    const [amount, setAmount] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleInstruction = () => {
        setActiveStep(activeStep + 1);
    };

    const handleDeposit = () => {
        setActiveStep(activeStep - 1);
    };

    const handleLogout = () => {
        history.push("/");
        localStorage.clear();
    }

    const steps = ['Confirm Amount', 'Authorize', 'Confirm Transaction', 'Processing'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Amount />;
            case 1:               
                return <Token />;
            case 2:
                return <Authorize />;
            case 3:
                return <Processing />;
            default:
                throw new Error('Unknown step');
        }
    }

    const Amount = () => {
        return (
            <>
            <h4>Transfer amount </h4>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="amount"
                        label="₦ Amount"
                        name="amount"
                        autoComplete="amount"
                        autoFocus
                        onChange={e => localStorage.setItem('amount', e.target.value)}
                        />
                </form>
            </>
        );
    }

    const Token = () => {
        const input = { "enableWithdrawal": true }

                const bearer = 'Bearer ' + localStorage.getItem('merchantToken');
                const { response, isLoading, error } = useQuery('enableWithdrawal', () => {
                        return fetch(enable, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": bearer
                            },
                            body: JSON.stringify({ query: Enable_Withdrawal, variables: { input } })
                        })
                            .then((response) => {
                                if (response.status >= 400) {
                                    throw new Error("Error fetching data");
                                } else {
                                    return response.json();
                                }
                            })
                            .then((response) => {
                                console.log(response)
                        });
                    });

  if (isLoading) return <Loading />
        if (error) return <pre>{error.message}</pre>;
    
        return (
            <>
            <h4> entrust Token</h4>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="entrust"
                        label="Token"
                        name="entrust"
                        autoFocus
                        // onChange={e => setEmail(e.target.value)}
                    />
                </form>
            </>
        );
    }

    const Authorize = () => {
        return (
            <>
            <Typography variant="h5" gutterBottom>
                                    👍 Token Authorized Successfully
                </Typography>
                                <Typography variant="subtitle1">
                                   Continue Transfer
                </Typography>
            </>
        );
    }

    function Processing (){   
        const request = { "amount": `${localStorage.getItem('amount')}`, "sourceCommerceWalletGuid": "01FEPDY1D7X5Q7QHS4TG9WNEF2", "destinationBranchWalletGuid":"01FEPC95026HEZGRS2DRMFDZEP", "destinationFundsType":"CASH", "referenceId":"Withdraw" }
        const employee = { "guid": '01EYS8SA1YGH3137K317DNBJ53' }
        // const { data, isLoading, error } = useQuery('Login', () => {
        //     return fetch(uri, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" }, 
        //         body: JSON.stringify({ query: GET_Login, variables: { input } })
        //     })
        //         .then((response) => {
        //             if (response.status >= 400) {
        //                 throw new Error("Error fetching data");
        //             } else {
        //                 return response.json();
        //             }
        //         })
        //         .then((data) => {
        //             localStorage.setItem('fiToken', data.data.Login.token)
        //             localStorage.setItem('fidecode', JSON.stringify(jwt_decode(localStorage.getItem('fiToken'))))
        //             const bearer = 'Bearer ' + localStorage.getItem('fiToken');

                // const { isLoading, error } = useQuery('getEmployeeDetails', () => {
                //     return fetch(fi, {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //             "Authorization": bearer
                //         },
                //         body: JSON.stringify({ query: GET_Employee_Detail })
                //     })
                //         .then((response) => {
                //             if (response.status >= 400) {
                //                 throw new Error("Error fetching data");
                //             } else {
                //                 return response.json();
                //             }
                //         })
                //         .then((data) => {
                //             localStorage.setItem('branhGuid', data.data.getEmployeeDetails.branchGuid)
                //             const branch = localStorage.getItem('branchGuid')

                        // const { isLoading, error } = useQuery('retrieveBranchDetails', () => {
                        //     return fetch(fi, {
                        //         method: "POST",
                        //         headers: {
                        //             "Content-Type": "application/json",
                        //             "Authorization": bearer
                        //         },
                        //         body: JSON.stringify({ query: GET_Branch_Detail, variables: branch })
                        //     })
                        //         .then((response) => {
                        //             if (response.status >= 400) {
                        //                 throw new Error("Error fetching data");
                        //             } else {
                        //                 return response.json();
                        //             }
                        //         })
                        //         .then((data) => {
                        //             localStorage.setItem('guid', data.data.retrieveBranchDetails.branchWallet.guid)
        
                        //         // const { data, isLoading, error } = useMutation('Login', () => {

                        //         });
                        // });
                //     })
                // });
                const bearer = 'Bearer ' + localStorage.getItem('fiToken');
                const { response, isLoading, error } = useQuery('createCommerceWithdrawalRequest', () => {
                        return fetch(fi, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": bearer
                            },
                            body: JSON.stringify({ query: Create__Commerce_Withdrawal_Request, variables: { request }, operationName: "createCommerceWithdrawalRequest" })
                        })
                            .then((response) => {
                                if (response.status >= 400) {
                                    throw new Error("Error fetching data");
                                } else {
                                    return response.json();
                                }
                            })
                            .then((response) => {
                                console.log(response)
                                localStorage.setItem('status', response.data) 
                                localStorage.setItem('amtId', response.data.createCommerceDepositRequest.id) 
                                localStorage.setItem('amtSuccess', response.data.createCommerceDepositRequest.amount) 
                        });
        });
//     })
// })
        if (isLoading) return <LoadingTransaction />
        if (error) return <pre>{error.message}</pre>;
    
        return (
            <div>
                             {localStorage.clear()}

            </div>

        );
    }

        const input = { "email": `${process.env.REACT_APP_FIUSERNAME}`, "password": `${process.env.REACT_APP_FIPASSWORD}`, "mfaCode": `${process.env.REACT_APP_MFACODE}` }
        const { data, isLoading, error } = useQuery('Login', () => {
            return fetch(uri, {
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
                    localStorage.setItem('fiToken', data.data.Login.token)
                    localStorage.setItem('fidecode', JSON.stringify(jwt_decode(localStorage.getItem('fiToken'))))
                })
            })

            if (isLoading) return <Loading />;
            if (error) return <pre>{error.message}</pre>;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar >
                    <Typography variant="h6" color="inherit" noWrap>
                        eNaira Commerce Portal
                    </Typography>
                    <IconButton color="inherit" edge="end" className={classes.toolbar} onClick={handleLogout}>
                        <Lock />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Perform Transactions
          </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {/* Use for mutation */}
                        {activeStep === steps.length ? (
                          null
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'End' : 'Next'}
                  </Button>
                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}