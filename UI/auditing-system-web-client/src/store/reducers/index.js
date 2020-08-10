
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import taskStatusReducer from './taskstatusReducer';
import auth from './auth';
import userReducer from './user';
import portfoliosReducer, { portfolioReducer } from './portfolio';
import tasksReducer, { taskReducer } from './task';
import documentsReducer, { documentReducer } from './document';
import commentsReducer, { commentReducer } from './comment';

const rootReducer = combineReducers({
    errors: errorReducer,
    taskStatus: taskStatusReducer,
    auth: auth,
    dbUser: userReducer,
    portfolios: portfoliosReducer,
    portfolio: portfolioReducer,
    tasks: tasksReducer,
    task: taskReducer,
    documents: documentsReducer,
    document: documentReducer,
    comments: commentsReducer,
    comment: commentReducer
});

export default rootReducer;
