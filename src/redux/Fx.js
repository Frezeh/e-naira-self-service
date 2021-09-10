import * as ActionTypes from './ActionTypes';

export const fx = (state = { errMess: null, fx:[]}, action) => {
  switch (action.type) {

    case ActionTypes.FX_FAILED:
      return {...state, errMess: action.payload};

      case ActionTypes.ADD_FX:
        return {...state, fx: action.payload};
        
    default:
      return state;
  }
};