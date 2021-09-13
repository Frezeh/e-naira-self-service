/* eslint-disable */
import React, { useEffect } from 'react'
import { baseCommerceLoginUrl, baseCommerceUrl, baseFiLoginUrl, baseFiUrl, baseMerchantLoginUrl, baseMerchantUrl, baseUrl } from '../redux/baseUrl';
import jwt_decode from "jwt-decode";
import { loginUser, loginError } from "../redux/ActionCreators";
import { useDispatch } from 'react-redux';
import { useQuery } from "react-query";
import { Loading } from './LoadingComponent';

// export const Header = () => {
//   useEffect(() => {
//     User();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// const dispatch = useDispatch();

// const User = () => {
//   return fetch(baseUrl + 'commerce/login/graphql', {
//     method: 'POST',
//     headers: { 
//         'Content-Type':'application/json', 
//         // 'Access-Control-Allow-Origin': ''
//     },
//     credentials: "same-origin",
//     body: {
//       "query": "query ($input: LoginUserInput!) {walletHolderLogin(input: $input) {token alias needsPasswordReset}}",
//       "variables": { "input": {
//           "email": "testing_ach@bitt.com", 
//           "password": "password1234"
//             } 
//         }
//     },
//   })
// .then(response => {
//     if (response.ok) {
//         return response;
//     } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//     }
//     },
//     error => {
//         throw error;
//     })
// .then(response => response.json())
// .then(response => {
//   console.log(JSON.stringify(response))
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
// })
// .catch(error => (error.message))
// };

const GET_Login = `
  query ($input: LoginUserInput!) {
    Login(input: $input) {
        token
        mfaCodeRequired
        refreshToken
    }
  }
`;

const uri = 'https://api.demo.bittcbdc.com/organization/login/graphql';

export default function FiTransfer() {
    const input = { "email": process.env.REACT_APP_FIUSERNAME, "password": process.env.REACT_APP_FIPASSWORD, "mfaCode": process.env.REACT_APP_MFACODE }
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
                data.data
                localStorage.setItem('refreshtoken', data.data.Login.refreshToken)
            });
    });

    if (isLoading) return <Loading />;
    if (error) return <pre>{error.message}</pre>;


    return (
        <div>
            <h1>SpaceX Launches</h1>
            {data}
        </div>
    );
}