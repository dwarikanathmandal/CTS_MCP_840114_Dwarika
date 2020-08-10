export const GET_TASK_STATUS = 'GET_TASK_STATUS';
export const CLEAR_TASK_STATUS = 'CLEAR_TASK_STATUS';

export function getTaskStatus(url, resource) {
    return {
        type: GET_TASK_STATUS,
        meta: {
            api: {
                url: url,
                method: 'GET'
            }
        }
    };
}

export function clearTaskStatus(url, resource) {
    return {
        type: CLEAR_TASK_STATUS,
    };
}