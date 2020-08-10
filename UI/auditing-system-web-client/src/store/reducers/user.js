import {
    GET_LOGGEDIN_USER,
    GET_USERS
} from "../actions/user";

import { ui_constants } from '../../constants/uiconstants';

export default (
    state = {
        loggedInUser: {},
    },
    action
) => {
    switch (action.type) {
        case GET_LOGGEDIN_USER:
            return {
                ...state,
                loggedInUser: action.response
            };
        case GET_USERS:
            return {
                ...state,
                allusers: action.response,
                clients: getUserByType(action.response, ui_constants.userType.client),
                auditors: getUserByType(action.response, ui_constants.userType.client)
            }
        default:
            return state;
    }
};

const getUserByType = (userlist, userType) => {
    return userlist.filter(user => user.userTypr === userType)
}
