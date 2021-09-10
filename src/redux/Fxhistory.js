import * as ActionTypes from './ActionTypes';

export const fxhistory = (state  = { isLoading: true,
                                        errMess: null,
                                        fxhistory:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FXHISTORY:
        return {...state, isLoading: false, errMess: null, fxhistory: action.payload.fxhistory};

        case ActionTypes.FXHISTORY_LOADING:
            return {...state, isLoading: true, errMess: null, fxhistory: []}

        case ActionTypes.FXHISTORY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};