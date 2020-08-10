import {
    GET_TASKS,
    GET_TASK_BY_ID,
    GET_TASK_BY_PORTFOLIO_ID,
    CLEAR_TASKS
} from "../actions/task";

import initialstate from './initialstate';

export default (
    state = initialstate.tasks,
    action
) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                tasks: action.response
            };
        case GET_TASK_BY_PORTFOLIO_ID:
            return {
                tasks: action.response
            }
        case CLEAR_TASKS:
            return {
                tasks: []
            }
        default:
            return state;
    }
};

export const taskReducer = (
    state = initialstate.task,
    action
) => {
    switch (action.type) {
        case GET_TASK_BY_ID:
            return {
                task: action.response
            };
        default:
            return state;
    }
};
