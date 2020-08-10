import { CLEAR_TASK_STATUS } from "./taskstatusactions";

export const API_ERRORS = 'API_ERRORS';
export const CLEAR_API_ERRORS = 'CLEAR_API_ERRORS';

export const clearApiErrors = () => {
    return {
        type: CLEAR_API_ERRORS
    }
}