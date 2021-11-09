/* eslint-disable */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import logo from '../images/NOVALOGO.png';
import Lottie from 'react-lottie';
import animationData from '../images/43055-naira-note.json';
import { loginUser, loginMerchant } from "../redux/ActionCreators";
import { useDispatch } from 'react-redux';

function Copyright() {
    return (
        <div>
           <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://novambl.com.com/">
                Nova Merchant Bank
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
            <div>
                <Lottie options={defaultOptions}
                    height={200}
                    width={200}
                />
            </div>
        </div>
    );
}

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [account, setAccount] = useState('');
    const creds = ({ email: email, password: password });
    const merchantCreds = ({ username: email, password: password });

    const dispatch = useDispatch();

    const changeWallet = (e) => {
        setAccount(e.target.value);
    }

    const handleLogin = (e) => {
        dispatch(loginUser(creds))        
    }

    const handleMerchantLogin = (e) => {
        dispatch(loginMerchant(merchantCreds));
    }

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <Typography component="h3" variant="h3">
                        Sign in
                    </Typography>

                    <Form className={classes.form} noValidate role="form">
                        <FormGroup>
                            <Label> <Typography component="h1" variant="h5">Select Wallet Type</Typography></Label>
                            <Input type="select" id="select" className="selectText"
                                onChange={changeWallet}>
                                <option value=''>Select</option>
                                <option value='Commerce'>Commerce</option>
                                <option value='Merchant'>Merchant</option>
                            </Input>
                        </FormGroup>
                    </Form>

                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            // autoComplete="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            // autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {
                        account === "Commerce"
                            ?
                            <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleLogin}>
                                Commerce Sign In
                            </Button>
                            :
                        account === "Merchant"
                            ?
                            <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleMerchantLogin}>
                                Merchant Sign In
                            </Button>
                            :
                            null
                        }
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

