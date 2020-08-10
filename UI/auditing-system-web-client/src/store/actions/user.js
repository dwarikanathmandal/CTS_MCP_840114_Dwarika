export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_LOGGEDIN_USER = "GET_LOGGEDIN_USER";

export const getUsers = (url) => {
    return {
        type: GET_USERS,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};

export const getUserById = (url) => {
    return {
        type: GET_USER_BY_ID,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};
