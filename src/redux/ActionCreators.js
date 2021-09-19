import * as ActionTypes from './ActionTypes';
import { baseUrl } from './baseUrl';

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
  dispatch(requestLogin(creds))

  return fetch(baseUrl + 'enaira/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
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
          localStorage.setItem('creds', JSON.stringify(creds.email));
          localStorage.setItem('id', response.id);
          localStorage.setItem('balance', response.balance);
          localStorage.setItem('type', response.type);
          // localStorage.setItem('type', 'Registered Merhant');

            dispatch(receiveLogin(response));
            alert( '👍' + ' ' + `${response.status}:` + ' ' + 'Welcome ' + creds.email);
      }
      else {
          var error = new Error(response.status + ' ' + response.message );
          error.response = response;
          throw error;
      }
  })
  .catch(error => { 
      dispatch(loginError(error.message));
      alert( '❌' + ' ' + error);
  })
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
  localStorage.clear();

  dispatch(receiveLogout())
  alert('Logout Successful ');
}

export const requestDeposit = () => {
  return {
    type: ActionTypes.DEPOSIT_LOADING,
  }
}

export const receiveDeposit = (response) => {
  return {
    type: ActionTypes.DEPOSIT_SUCCESS,
    status: response.status,
    amount: response.amount,
    id: response.id
  }
}

export const depositError = (message) => {
  return {
    type: ActionTypes.DEPOSIT_FAILURE,
    message
  }
}

export const commerceTranxDeposit = () => (dispatch) => {
  const body = {
    amount: localStorage.getItem('amount'),
    Id: localStorage.getItem('id')
};

dispatch(requestDeposit())

return fetch(baseUrl + 'enaira/deposit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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
            localStorage.setItem('success', 'Successful  👍');
            localStorage.setItem('status', response.status);
            localStorage.setItem('amount', response.amount);
            localStorage.setItem('guid', response.id);

            dispatch(receiveDeposit(response));
        }
        else {
            var error = new Error(response.status + ' ' + response.message);
            error.response = response;
            localStorage.setItem('success', 'Unsuccessful  ❌');
            localStorage.setItem('status', response.status);
            localStorage.setItem('message', response.message);                    
            throw error;
        }
    })
    .catch(error => {
        dispatch(depositError(error.message))
    })
};

export const requestWithdrawal = () => {
  return {
    type: ActionTypes.WITHDRAWAL_LOADING,
  }
}

export const receiveWithdrawal = (response) => {
  return {
    type: ActionTypes.WITHDRAWAL_SUCCESS,
    status: response.status,
    amount: response.amount,
    id: response.id
  }
}

export const WithdrawalError = (message) => {
  return {
    type: ActionTypes.WITHDRAWAL_FAILURE,
    message
  }
}

export const commerceTranxWithdrawal = () => (dispatch) => {
  const body = {
    amount: localStorage.getItem('amount'),
    Id: localStorage.getItem('id'),
    token: localStorage.getItem('token')
};

dispatch(requestWithdrawal())

return fetch(baseUrl + 'enaira/withdrawal', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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
            localStorage.setItem('success', 'Successful  👍');
            localStorage.setItem('status', response.status);
            localStorage.setItem('amount', response.amount);
            localStorage.setItem('guid', response.id);

            dispatch(receiveWithdrawal(response));
        }
        else {
            var error = new Error(response.status + ' ' + response.message);
            error.response = response;
            localStorage.setItem('success', 'Unsuccessful  ❌');
            localStorage.setItem('status', response.status);
            localStorage.setItem('message', response.message);                    
            throw error;
        }
    })
    .catch(error => {
        dispatch(WithdrawalError(error.message))
    })
};

export const requestMerchantLogin = (merchantCreds) => {
  return {
    type: ActionTypes.MERCHANT_LOGIN_REQUEST,
    merchantCreds
  }
}

// export const receiveMerchantLogin = (response) => {
//   return {
//     type: ActionTypes.MERCHANT_LOGIN_SUCCESS,
//     token: response.token,
//     id: response.id
//   }
// }

// export const loginMerchantError = (message) => {
//   return {
//     type: ActionTypes.MERCHANT_LOGIN_FAILURE,
//     message
//   }
// }

export const loginMerchant = (merchantCreds) => (dispatch) => {
  dispatch(requestMerchantLogin(merchantCreds))

  return fetch(baseUrl + 'enaira/merchant/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(merchantCreds)
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
          localStorage.setItem('creds', JSON.stringify(merchantCreds.username));
          localStorage.setItem('id', response.id);
          localStorage.setItem('balance', response.balance);
          localStorage.setItem('type', 'Registered Merchant');

            dispatch(receiveLogin(response));
            alert( '👍' + ' ' + `${response.status}:` + ' ' + 'Welcome ' + merchantCreds.username);
      }
      else {
          var error = new Error(response.status + ' ' + response.message );
          error.response = response;
          throw error;
      }
  })
  .catch(error => { 
      dispatch(loginError(error.message));
      alert( '❌' + ' ' + error);
  })
};