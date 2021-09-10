import { createStore, combineReducers, applyMiddleware } from 'redux';
import { auth } from './Auth';
import { user } from './Users';
import { fxhistory } from './Fxhistory';
import { fx } from './Fx';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: auth, 
            user: user,
            fxhistory: fxhistory,
            fx: fx, 
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}