import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    apiError,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                isVerifying ? (
                    <div/> 
                ) : isAuthenticated ? (
                    <Component {...props} />
                ) : (
                            <Redirect
                                to={{
                                    // pathname: apiError && apiError != null ? "/register" : "/login",
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
            }
        />
    );
export default ProtectedRoute;