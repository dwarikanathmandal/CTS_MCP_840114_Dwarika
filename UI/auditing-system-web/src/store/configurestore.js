/**
 * Created by Dwarika on 16/07/2019.
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
import apiMiddleware from '../middlewares/apimiddleware';
import logger from '../middlewares/loggermiddleware';
import { verifyAuth } from './actions/auth';

// import config from '../auth/config';

export default function configureStore(initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        // Initiate redux dev tools	
        applyMiddleware(
            // logger,
            thunkMiddleware,
            apiMiddleware
        )
    );   
    store.dispatch(verifyAuth());
    return store;

}
