
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

export const GET_COMMENTS_BY_TASK_ID = "GET_COMMENTS_BY_TASK_ID";
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID";

export const addComment = (url, formData) => {
    return {
        type: ADD_COMMENT,
        meta: {
            api: {
                url: url,
                method: 'post',
                data: formData
            }
        },
    }
};

export const updateComment = (url, formData) => {
    return {
        type: UPDATE_COMMENT,
        meta: {
            api: {
                url: url,
                method: 'put',
                data: formData
            }
        },
    }
};


export const getCommentsByTaskId = (url, taskId) => {
    return {
        type: GET_COMMENTS_BY_TASK_ID,
        meta: {
            api: {
                url: url + '/' + taskId,
                method: 'get'
            }
        },
    }
};


export const getCommentbyId = (url) => {
    return {
        type: GET_COMMENT_BY_ID,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};


export const deleteComment = (url) => {
    return {
        type: DELETE_COMMENT,
        meta: {
            api: {
                url: url,
                method: 'delete'
            }
        },
    }
};


export const clearComments = (url) => {
    return {
        type: CLEAR_COMMENTS
    }
};