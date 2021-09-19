// import * as ActionTypes from './ActionTypes';

// export const merchantAuth = (state = {
//         isLoading: false,
//         isAuthenticated: localStorage.getItem('token') ? true : false,
//         token: localStorage.getItem('token'),
//         errMess: null
//     }, action) => {
//     switch (action.type) {
//         case ActionTypes. MERCHANT_LOGIN_REQUEST:
//             return {...state,
//                 isLoading: true,
//                 isAuthenticated: false,
//                 user: action.creds
//             };
//         case ActionTypes. MERCHANT_LOGIN_SUCCESS:
//             return {...state,
//                 isLoading: false,
//                 isAuthenticated: true,
//                 errMess: '',
//                 token: action.token,
//                 id: action.id
//             };
//         case ActionTypes. MERCHANT_LOGIN_FAILURE:
//             return {...state,
//                 isLoading: false,
//                 isAuthenticated: false,
//                 errMess: action.message
//             };
//         case ActionTypes.LOGOUT_REQUEST:
//             return {...state,
//                 isLoading: true,
//                 isAuthenticated: true
//             };
//         case ActionTypes.LOGOUT_SUCCESS:
//             return {...state,
//                 isLoading: false,
//                 isAuthenticated: false,
//                 token: '',
//                 user: null
//             };
//         default:
//             return state
//     }
// }