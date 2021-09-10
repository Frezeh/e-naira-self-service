import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import animationData from '../43055-naira-note.json';
// import logo from './logo.svg';
import logo from '../NOVALOGO.png';
import { useQuery, gql } from "@apollo/client";
import jwt_decode from "jwt-decode";
import { loginUser } from "../redux/ActionCreators";
import { useDispatch } from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Nova Merchant Bank '}
      {/* <Link color="inherit" href="https://novambl.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

const GET_Login = gql`
  query ($input: LoginUserInput!) {
    Login(input: $input) {
        token
        mfaCodeRequired
        refreshToken
    }
  }
`;

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const creds = ({ username: email, password: password });

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(creds));
    console.log(JSON.stringify(creds));
  }

  // function Login(e) {
  //   e.preventDefault();
  //   // const input = {"email": "medici.qa.test+cfb_teller@gmail.com", "password": "password1234", "mfaCode": "123456789"}
  //   const input = JSON.stringify({ email: email, password: password, mfaCode: "123456789" })
  //   const { loading, error, data } = useQuery(
  //     GET_Login,
  //     {
  //       variables: { input },
  //       notifyOnNetworkStatusChange: true
  //       // pollInterval: 500
  //     }
  //   );

  //   if (loading) return null;
  //   if (error) return `Error!: ${error}`;

  //   return (
  //     localStorage.setItem('token', data.Login.token),
  //     localStorage.setItem('refreshToken', data.Login.refreshToken),
  //     localStorage.setItem('decode', JSON.stringify(jwt_decode(data.Login.token)))
  //   );
  // }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
        <div style={{ backgroundColor: "#282c34" }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 style={{ textAlign: "center", fontSize: 40, color: "white" }}>NOVA Merchant Bank eNaira Portal</h1>
          <Lottie options={defaultOptions}
            height={1000}
            width={1000}
          />
        </div>
    );
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoFocus
              value={email}
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
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {
              email === 'Admin' && password === 'password'
                ?
                <Link to={`/tranx`}>
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Login
            </Button>
                </Link>
                :
                email === 'Frezeh' && password === 'password'
                  ?
                  <Link to={`/teller`}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Login
            </Button>
                  </Link>
                  :
                null
            }


            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button> */}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}