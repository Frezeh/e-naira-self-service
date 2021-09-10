import * as ActionTypes from './ActionTypes';
import { baseCommerceLoginUrl, baseCommerceUrl, baseFiLoginUrl, baseFiUrl, baseMerchantLoginUrl, baseMerchantUrl } from './baseUrl';
import jwt_decode from "jwt-decode";

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
}

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
    id: response.id
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  }
}

export const loginUser = (creds) => (dispatch) => {
  // dispatch(requestLogin(creds))

  return fetch(baseCommerceLoginUrl, {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json', 
          'Access-Control-Allow-Origin': baseCommerceLoginUrl
      },
      body: {
        "query": "query ($input: LoginUserInput!) {walletHolderLogin(input: $input) {token alias needsPasswordReset}}",
        "variables": { "input": {
            "email": "testing_ach@bitt.com", 
            "password": "password1234"
              } 
          }
      },
    // credentials: "same-origin"
    mode: 'no-cors'
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
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('decode', JSON.stringify(jwt_decode(response.token)))

            alert( '👍' + ' ' + 'Login Successful:' + ' ' + 'Welcome ' + creds.username);
      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');

  dispatch(receiveLogout())
  alert('Logout Successful ');
}

// export const addContactFeedback = (contact) => ({
//   type: ActionTypes.ADD_CONTACT_FEEDBACK,
//   payload: contact
// });

// export const postContactFeedback = (values) => (dispatch) => {
  
//   const newFeedback = {
//     firstname: values.firstname,
//     lastname: values.lastname,
//     telnum: values.telnum, 
//     email: values.email, 
//     agree: values.agree, 
//     contactType: values.contactType, 
//     message: values.message
//   };
  
//   return fetch(baseUrl + 'contactus', {
//       method: "POST",
//       body: JSON.stringify(newFeedback),
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "same-origin"
//   })
//   .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//       }
//     },
//     error => {
//           throw error;
//     })
//   .then(response => response.json())
//   .then(response => { dispatch(addContactFeedback(response)); alert("Your feedback has been sent, Great hearing from you"); }) 
//   .catch(error =>  error.message);
//   //.catch(error =>  alert('Your feedback could not be posted\nError: '+error.message));
// };

// export const fetchUser = () => (dispatch) => {

//     const id = 'auth.id';
//     dispatch(userLoading());
  
//     return fetch(baseUrl + `users/${id}`)
//       .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//         error => {
//           var errmess = new Error(error.message);
//           throw errmess;
//         })
//       .then(response => response.json())
//       .then(user => dispatch(addUser(user)))
//       .catch(error => dispatch(userFailed(error.message)));
//   };
  
//   export const userLoading = () => ({
//     type: ActionTypes.USER_LOADING
//   });
  
//   export const userFailed = (errmess) => ({
//     type: ActionTypes.USER_FAILED,
//     payload: errmess
//   });
  
//   export const addUser = (user) => ({
//     type: ActionTypes.ADD_USER,
//     payload: user
//   });
  
//   export const fxHistoryLoading = () => ({
//     type: ActionTypes.FXHISTORY_LOADING
//   });
  
//   export const fxHistoryFailed = (errmess) => ({
//     type: ActionTypes.FXHISTORY_FAILED,
//     payload: errmess
//   });
  
//   export const addFxHistory = (user) => ({
//     type: ActionTypes.ADD_FXHISTORY,
//     payload: user
//   });
  
//   export const addFxSale = (fx) => ({
//     type: ActionTypes.ADD_FX,
//     payload: fx
//   });
  
//   export const postFxSale = (selltext, sellamount) => (dispatch) => {
  
//     const newSale = {
//       text: selltext,
//       amount: sellamount,
//     };
  
//     const bearer = 'Bearer ' + localStorage.getItem('token');//asyn
  
//     return fetch(baseUrl + 'fx/sell', {
//       method: "POST",
//       body: JSON.stringify(newSale),
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': bearer
//       },
//       credentials: "same-origin"
//     })
//       .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//         error => {
//           throw error;
//         })
//       .then(response => response.json())
//       .then(stock => { dispatch(addFxSale(stock)); alert('👍' + ' ' + 'Your Request has been sent! '); })
//       .catch(error => { alert('Your sale could not be posted, \nError: ' + error.message); });
//   };

//   export const postFxPurchase = (buytext, buyamount) => (dispatch) => {
  
//     const newPurchase = {
//       text: buytext,
//       amount: buyamount,
//     };
  
//     const bearer = 'Bearer ' + localStorage.getItem('token');//asyn
  
//     return fetch(baseUrl + 'fx/buy', {
//       method: "POST",
//       body: JSON.stringify(newPurchase),
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': bearer
//       },
//       credentials: "same-origin"
//     })
//       .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//         error => {
//           throw error;
//         })
//       .then(response => response.json())
//       .then(stock => { dispatch(addFxSale(stock)); alert('👍' + ' ' + 'Your Request has been sent, \nAllow some time for confirmation and DO NOT resend the request ! '); })
//       .catch(error => { alert('Your purchase could not be posted, \nError: ' + error.message); });
//   };

//   export const addFeedback = (feedback) => ({
//     type: ActionTypes.ADD_FEEDBACK,
//     payload: feedback
//   });
  
//   export const postFeedback = (values) => (dispatch) => {
  
//     const newFeedback = {
//       firstname: values.firstname,
//       lastname: values.lastname,
//       telnum: values.telnum,
//       email: values.email,
//       bvnnum: values.bvnnum,
//       address: values.address
//     };
  
//     return fetch(baseUrl + 'feedback', {
//       method: "POST",
//       body: JSON.stringify(newFeedback),
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "same-origin"
//     })
//       .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//         error => {
//           throw error;
//         })
//       .then(response => response.json())
//       .then(response => { dispatch(addFeedback(response)); alert('👍' + ' ' + 'Registration Successful! Allow 24hrs for feedback.'); })
//       .catch(error => alert('Your registration could not be posted\nError: ' + error.message));
//   };
  

