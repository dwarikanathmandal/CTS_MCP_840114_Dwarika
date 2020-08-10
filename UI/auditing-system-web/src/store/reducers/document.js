import {
    GET_DOCS_BY_TASK_ID,
    GET_DOC_BY_ID,
    CLEAR_DOCS
} from "../actions/document";

import initialstate from './initialstate';

export default (
    state = initialstate.documents,
    action
) => {
    switch (action.type) {
        case GET_DOCS_BY_TASK_ID:
            return action.response;
        case CLEAR_DOCS:
            return []
        default:
            return state;
    }
};

export const documentReducer = (
    state = initialstate.documents,
    action
) => {
    switch (action.type) {
        case GET_DOC_BY_ID:
            return action.response;
        default:
            return state;
    }
};
