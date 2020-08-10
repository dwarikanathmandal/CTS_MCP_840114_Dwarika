import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { SIGNUP_FAILURE, SIGNUP_SUCCESS, GET_LOGGEDIN_USER, REGISTER } from '../store/actions/auth';
import { API_ERRORS, CLEAR_API_ERRORS } from '../store/actions/error';
import _ from 'lodash';
import { act } from 'react-test-renderer';

/*
 * Redux Middleware for handling API calls
 * On successful api response, the response and responseObj are attached to the action and passed to next middleware
 * On Error and error object is attached to the action and API_ERROR action is dispatched 
 * config can be passed as a parameter to the middleware in applyMiddleware method when creating the store
 *
 */
const apiMiddleware = (store) => (next) => (action) => {
    const __NAME = 'API Middleware',
        API_ERRORS = 'API_ERRORS';

    console.log("middleware", action)

    if (store.getState().errors != null) {
        next({
            type: CLEAR_API_ERRORS
        });
    }
    // skip to next middleware for API_ERROR action
    if (action.type === API_ERRORS) {
        next(action);
        return Promise.reject(action.error);
    }

	/* Existence of the meta.api object is the trigger to treat this
	 * action as an API call. */
    if (!(action.meta && action.meta.api)) {
        next(action);
        return Promise.resolve(
            `[${__NAME}] - action.type:`,
            action.type,
            'Skipping API call since API meta not available'
        );
    }

    let { method, url, data, headers, trackWithArea } = action.meta.api,
        auth = action.meta.auth;

    const promise = new Promise((resolve, reject) => {

        const needsJSON = ['post', 'put', 'patch'].includes(method.toLowerCase());
        let customHeaders = headers || {};

        customHeaders['Content-Type'] = needsJSON ? 'application/json' : '';

        axios({ method, url, data, headers: customHeaders })
            .then((response) => {
                action.response = response.data;
                action.responseObj = response;
                next(action);
                if (action.type === REGISTER || action.type === GET_LOGGEDIN_USER) {
                    next({
                        ...action,
                        type: SIGNUP_SUCCESS,
                    })
                }
                return resolve(response);
            })
            .catch((error) => {
                error.requestUrl = action.meta.api.url;
                action.error = error;
                action.response = {};
                action.responseObj = {};
                next({ type: API_ERRORS, error });
                if (action.type === REGISTER || action.type === GET_LOGGEDIN_USER) {
                    next(
                        {
                            type: SIGNUP_FAILURE,
                            error: error,
                        });

                }
                console.log(`[${__NAME}] - action.type: ${action.type} failed in api call`, error);
                return reject(error);
            });
    });

    return !_.isEmpty(trackWithArea) && _.isString(trackWithArea)
        ? trackPromise(promise, trackWithArea)
        : promise;
};

export default apiMiddleware;
