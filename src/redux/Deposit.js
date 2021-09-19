import * as ActionTypes from './ActionTypes';

// we would also want a util to check if the token is expired. 
export const deposit = (state = {
        isLoading: false,
        errMess: null,
    }, action) => {
    switch (action.type) {
        case ActionTypes.DEPOSIT_LOADING:
            return {...state,
                isLoading: true,
            };
        case ActionTypes.DEPOSIT_SUCCESS:
            return {...state,
                isLoading: false,
                errMess: '',
                status: action.status,
                amount: action.amount,
                id: action.id
            };
        case ActionTypes.DEPOSIT_FAILURE:
            return {...state,
                isLoading: false,
                errMess: action.message
            };
        default:
            return state
    }
}