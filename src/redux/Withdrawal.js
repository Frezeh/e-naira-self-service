import * as ActionTypes from './ActionTypes';

// we would also want a util to check if the token is expired. 
export const withdrawal = (state = {
        isLoading: false,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.WITHDRAWAL_LOADING:
            return {...state,
                isLoading: true,
            };
        case ActionTypes.WITHDRAWAL_SUCCESS:
            return {...state,
                isLoading: false,
                errMess: '',
                status: action.status,
                amount: action.amount,
                id: action.id
            };
        case ActionTypes.WITHDRAWAL_FAILURE:
            return {...state,
                isLoading: false,
                errMess: action.message
            };
        default:
            return state
    }
}