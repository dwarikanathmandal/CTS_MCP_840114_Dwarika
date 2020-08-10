
import { post } from 'axios';

export const UPLOAD_DOC = "UPLOAD_DOC";
export const GET_DOCS_BY_TASK_ID = "GET_DOCS_BY_TASK_ID";
export const GET_DOC_BY_ID = "GET_DOCS_BY_TASK_ID";
export const DELETE_DOC = "DELETE_DOC";
export const CLEAR_DOCS ="CLEAR_DOCS";

export const uploadDocument = (url, formData, userid, portfolioid) => {

    return post(url, formData, {
        headers: {
            'content-type': 'multipart/form-data',
            'userid': userid,
            'portfolioId': portfolioid
        },
    });
};


export const getDocsByTaskId = (url, taskId) => {
    return {
        type: GET_DOCS_BY_TASK_ID,
        meta: {
            api: {
                url: url + '/' + taskId,
                method: 'get'
            }
        },
    }
};


export const getDocsbyId = (url) => {
    return {
        type: GET_DOC_BY_ID,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};


export const deleteDoc = (url) => {
    return {
        type: DELETE_DOC,
        meta: {
            api: {
                url: url,
                method: 'delete'
            }
        },
    }
};


export const clearDocuments = (url) => {
    return {
        type: CLEAR_DOCS
    }
};