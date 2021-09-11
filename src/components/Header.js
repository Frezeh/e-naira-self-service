/* eslint-disable */
import React, { useEffect } from 'react'
import { baseCommerceLoginUrl, baseCommerceUrl, baseFiLoginUrl, baseFiUrl, baseMerchantLoginUrl, baseMerchantUrl, baseUrl } from '../redux/baseUrl';
import jwt_decode from "jwt-decode";
import { loginUser, loginError } from "../redux/ActionCreators";
import { useDispatch } from 'react-redux';

export const Header = () => {
  useEffect(() => {
    User();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const dispatch = useDispatch();

const User = () => {
  return fetch(baseUrl + 'commerce/login/graphql', {
    method: 'POST',
    headers: { 
        'Content-Type':'application/json', 
        // 'Access-Control-Allow-Origin': ''
    },
    body: {
      "query": "query ($input: LoginUserInput!) {walletHolderLogin(input: $input) {token alias needsPasswordReset}}",
      "variables": { "input": {
          "email": "testing_ach@bitt.com", 
          "password": "password1234"
            } 
        }
    },
    // mode: 'no-cors'
  })
.then(response => {
    if (response.ok) {
        return response;
    } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }
    },
    error => {
        throw error;
    })
.then(response => response.json())
.then(response => {
  console.log(JSON.stringify(response))
    // if (response.success) {
    //   localStorage.setItem('token', data.walletHolderLogin.token);
    //   localStorage.setItem('refreshToken', response.data.walletHolderLogin.refreshToken)
    //   localStorage.setItem('decode', JSON.stringify(jwt_decode(response.data.walletHolderLogin.token)))

    //       alert( '👍' + ' ' + 'Login Successful:' + ' ' + 'Welcome ');
    // }
    // else {
    //     var error = new Error('Error ' + response.status);
    //     error.response = response;
    //     throw error;
    // }
})
.catch(error => (error.message))
};

    return (
          <div>
            <h1>Decoded: {localStorage.getItem('token')}</h1>
           
          </div>
        );
      }


// function Login() {
//   const input = { "email": "medici.qa.test+cfb_teller@gmail.com", "password": "password1234", "mfaCode": "123456789" }
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
//   if (data) return localStorage.setItem('token', data.Login.token); localStorage.setItem('refreshToken', data.Login.refreshToken); localStorage.setItem('decode', JSON.stringify(jwt_decode(data.Login.token)));

//   return (
//     <div>
//       <h1>Decoded: {data.Login.token}</h1>
//       {localStorage.setItem('token', data.Login.token)}
//       {localStorage.setItem('refreshToken', data.Login.refreshToken)}
//       {localStorage.setItem('decode', JSON.stringify(jwt_decode(data.Login.token)))}
//     </div>
//   );
// }