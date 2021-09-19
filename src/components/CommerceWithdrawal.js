/* eslint-disable */
import React, { useEffect, useState } from 'react'
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
import Lock from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import { logoutUser } from '../redux/ActionCreators';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import ProcessingWithdrawal from './ProcessingWithdrawal';
import NavBar from './Navbar';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://novambl.com.com/">
                Nova Merchant Bank
            </Link>{' '}
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

export default function CommerceWithdrawal() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const HandleLogout = () => {
        dispatch(logoutUser());
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
                return <ProcessingWithdrawal />;
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
                        id="withdrawalamount"
                        label="₦ Amount"
                        name="withdrawalamount"
                        autoComplete="withdrawalamount"
                        autoFocus
                        onChange={e => localStorage.setItem('amount', e.target.value)}
                    />
                </form>
            </>
        );
    }

    const Token = () => {
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

    return (
        <React.Fragment>
            <NavBar />
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
                             <button className="btn btn-md btn-info"  onClick={HandleLogout} style={{
                                width: 500,
                                backgroundColor: "#4682B4",
                                padding: 15,
                                justifyContent: "center",
                                marginBottom: 20,
                                borderRadius: 24,
                                color: "white",
                                fontSize: 20
                            }}>
                               End Session
                            </button>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                      null
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