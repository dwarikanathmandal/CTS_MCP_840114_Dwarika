import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_FAILURE,
    // REGISTER,
    SIGNUP_SUCCESS,
} from "../actions/auth";

export default (
    state = {
        isLoggingIn: false,
        isLoggingOut: false,
        isSigningUp: false,
        isVerifying: false,
        loginError: false,
        logoutError: false,
        signupError: false,
        isAuthenticated: false,
        apiError: null,
        user: {}
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false,
                apiError: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user,
                apiError: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                isVerifying:false,
                loginError: true
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {}
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false,
                apiError: null,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
                apiError: null,
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                isSigningUp: true,
                signupError: false,
                isLoggingIn: true,
                loginError: false,
                apiError: null,
                isAuthenticated: false,
            };
        // case REGISTER:
        //     return {
        //         ...state,
        //         isLoggingIn: false,
        //         isSigningUp: false,
        //         isAuthenticated: true,
        //         user: action.user
        //     };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isSigningUp: false,
                isAuthenticated: true,
                apiError: null,
                user: action.user
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isSigningUp: false,
                signupError: true,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
                apiError: action.error
            };
        default:
            return state;
    }
};
