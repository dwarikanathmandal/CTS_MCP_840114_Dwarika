import { firebaseClient } from "../../firebase/firebase";
import apiConfig from '../../configs/api';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const REGISTER = "REGISTER";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const GET_LOGGEDIN_USER = "GET_LOGGEDIN_USER";


export const getLoggedInUser = (useruid) => {
    return {
        type: GET_LOGGEDIN_USER,
        meta: {
            api: {
                url: apiConfig.baseUrl + 'users/' + useruid,
                method: 'get'
            }
        },
    }
}

const addUser = (url, data, firebaseResponse) => {
    return {
        type: REGISTER,
        meta: {
            api: {
                url: url,
                method: 'post',
                data: data
            }
        },
        user: firebaseResponse
    }
}


const requestSignup = () => {
    return {
        type: SIGNUP_REQUEST
    };
};

const signupError = (error) => {
    return {
        type: SIGNUP_FAILURE,
        error: error,
    };
};

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    firebaseClient
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user));
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(loginError());
        });
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    firebaseClient
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError());
        });
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    firebaseClient
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                // console.log(user);
                dispatch(getLoggedInUser(user.uid)).then(response => {
                    dispatch(receiveLogin(user));
                    dispatch(verifySuccess());
                }).catch(error => {
                    dispatch(loginError());
                })
            } else {
                dispatch(verifySuccess());
            }

        });
};

export const registerUser = (url, data) => dispatch => {
    dispatch(requestSignup());
    firebaseClient.auth().createUserWithEmailAndPassword(data.userName, data.password)
        .then(response => {
            data.email = data.userName
            data.userId = response.user.uid
            dispatch(addUser(url, data, response))
        })
        .catch(error => {
            dispatch(signupError(error));
        });

}