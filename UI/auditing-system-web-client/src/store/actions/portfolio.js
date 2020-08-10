export const CREATE_PORTFOLIO = "CREATE_PORTFOLIO";
export const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";
export const GET_PORTFOLIOS = "GET_PORTFOLIOS";
export const GET_PORTFOLIO_BY_ID = "GET_PORTFOLIO_BY_ID";

export const createPortfolio = (url, data) => {
    return {
        type: CREATE_PORTFOLIO,
        meta: {
            api: {
                url: url,
                method: 'post',
                data: data
            }
        },
    }
};

export const updatePortfolio = (url, data) => {
    return {
        type: UPDATE_PORTFOLIO,
        meta: {
            api: {
                url: url,
                method: 'put',
                data: data
            }
        },
    }
}

export const getPortfolios = (url) => {
    return {
        type: GET_PORTFOLIOS,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};


export const getPortfolioById = (url) => {
    return {
        type: GET_PORTFOLIO_BY_ID,
        meta: {
            api: {
                url: url,
                method: 'get'
            }
        },
    }
};