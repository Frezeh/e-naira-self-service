import { createStore, combineReducers, applyMiddleware } from 'redux';
import { auth } from './Auth';
import { deposit } from './Deposit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { withdrawal } from './Withdrawal';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: auth,
            deposit: deposit,
            withdrawal: withdrawal
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}