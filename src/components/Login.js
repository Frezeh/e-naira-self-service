/* eslint-disable */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import logo from '../NOVALOGO.png';
import Lottie from 'react-lottie';
import animationData from '../43055-naira-note.json';

function Copyright() {
  return (
    <div>
       <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Nova Merchant Bank {' '}
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState('');
  const creds = ({ username: email, password: password });

  const changeWallet = (e) => {
    setAccount(e.target.value);
  }
  const classes = useStyles();

  return (
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
            <Input type="select" name="select" id="select" className="selectText"
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
            autoComplete="email"
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
            autoComplete="current-password"
            // onChange={e => localStorage.setItem('userPassword', e.target.value)}
            onChange={e => setPassword(e.target.value)}
          />
          {
            account === "Commerce" 
            ?
            <Link to={{pathname:'/landing', state:{ email: email, password: password}}}>
                <Button fullWidth variant="contained" color="primary" className={classes.submit}>
                Commerce Sign In
                </Button>
              </Link>
            :
            account === "Merchant" 
            ?
            <Link to={{pathname:'/mlanding', state:{ email: email, password: password}}}>
                <Button fullWidth variant="contained" color="primary" className={classes.submit}>
                Merchant Sign In
                </Button>
              </Link>
            :
            null
          }
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

