export const CREATE_TASK = "CREATE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASKS = "GET_TASKS";
export const GET_TASK_BY_ID = "GET_TASK_BY_ID";
export const GET_TASK_BY_PORTFOLIO_ID = "GET_TASK_BY_PORTFOLIO_ID";
export const CLEAR_TASKS = "CLEAR_TASKS";
export const COMPLETE_TASK = 'COMPLETE_TASK';

export const createTask = (url, data) => {
    return {
        type: CREATE_TASK,
        meta: {
            api: {
                url: url,
                method: 'post',
                data: data
            }
        },
    }
};


export const updateTask = (url, data) => {
    return {
        type: UPDATE_TASK,
        meta: {
            api: {
                url: url,
                method: 'put',
                data: data
            }
        },
    }
};

export const completeTask = (url, userId) => {
    return {
        type: COMPLETE_TASK,
        meta: {
            api: {
                url: url,
                method: 'put'
            }
        },
    }
};


export const getTasks = (url) => {
    return {
        type: GET_TASKS,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};


export const getTaskById = (url) => {
    return {
        type: GET_TASK_BY_ID,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};


export const getTaskByPortfolioId = (url) => {
    return {
        type: GET_TASK_BY_PORTFOLIO_ID,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};

export const clearTasks = () => {
    return {
        type: CLEAR_TASKS
    }
}