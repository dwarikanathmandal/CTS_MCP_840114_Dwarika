import { GET_TASK_STATUS, CLEAR_TASK_STATUS } from '../actions/taskstatusactions';

import initialstate from './initialstate';


export default function taskStatusReducer(state = initialstate.taskStatus, action) {
    switch (action.type) {
        case GET_TASK_STATUS: {
            return action.response;
        }
        case CLEAR_TASK_STATUS: {
            return {};
        }
        default:
            return state;
    }
}
