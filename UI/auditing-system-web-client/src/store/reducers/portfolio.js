import {
    GET_PORTFOLIOS,
    GET_PORTFOLIO_BY_ID
} from "../actions/portfolio";

import initialstate from './initialstate';

export default (
    state = initialstate.portfolios,
    action
) => {
    switch (action.type) {
        case GET_PORTFOLIOS:
            return {
                portfolios: action.response
            };
        default:
            return state;
    }
};



export const portfolioReducer = (
    state = initialstate.portfolio,
    action
) => {
    switch (action.type) {
        case GET_PORTFOLIO_BY_ID:
            return action.response;
        default:
            return state;
    }
};
