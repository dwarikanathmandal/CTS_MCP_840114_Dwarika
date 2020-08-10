import {
    GET_COMMENTS_BY_TASK_ID,
    GET_COMMENT_BY_ID,
    CLEAR_COMMENTS
} from "../actions/comment";

export default (
    state = [],
    action
) => {
    switch (action.type) {
        case GET_COMMENTS_BY_TASK_ID:
            return action.response;
        case CLEAR_COMMENTS:
            return []
        default:
            return state;
    }
};

export const commentReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case GET_COMMENT_BY_ID:
            return action.response;
        default:
            return state;
    }
};
