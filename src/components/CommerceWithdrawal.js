/* eslint-disable */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
} from "@material-ui/core";
import { logoutUser } from "../redux/ActionCreators";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";
import ProcessingWithdrawal from "./ProcessingWithdrawal";
import NavBar from "./Navbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://novambl.com.com/">
        Nova Merchant Bank
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    paddingTop: 50,
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
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const Amount = ({ setAmount }) => {
  const classes = useStyles();
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
          autoFocus
          onChange={(e) => setAmount(e.target.value)}
        />
      </form>
    </>
  );
};

const Token = ({ setToken }) => {
  const classes = useStyles();
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
          onChange={(e) => setToken(e.target.value)}
        />
      </form>
    </>
  );
};

const Authorize = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        👍 Token Authorized Successfully
      </Typography>
      <Typography variant="subtitle1">Continue Transfer</Typography>
    </>
  );
};

export default function CommerceWithdrawal() {
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState(0);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const desktop = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const HandleLogout = () => {
    dispatch(logoutUser());
  };

  const steps = [
    "Confirm Amount",
    "Authorize",
    "Confirm Transaction",
    "Processing",
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Amount setAmount={setAmount} />;
      case 1:
        return <Token setToken={setToken} />;
      case 2:
        return <Authorize />;
      case 3:
        return <ProcessingWithdrawal amount={amount} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <NavBar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Perform Transactions
          </Typography>
          {!desktop ? (
            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              style={{ flexWrap: "wrap" }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          <React.Fragment>
            {/* Use for mutation */}
            {activeStep === steps.length ? (
              <button
                onClick={HandleLogout}
                style={{
                  width: "100%",
                  backgroundColor: "#4682B4",
                  padding: 15,
                  justifyContent: "center",
                  marginBottom: 20,
                  borderRadius: 24,
                  color: "white",
                  fontSize: 20,
                }}
              >
                End Session
              </button>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && null}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "End" : "Next"}
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
