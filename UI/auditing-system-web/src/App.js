import React from "react";
import { connect } from "react-redux";
import { browserHistory, withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import ProtectedRoute from "././Routes/ProtectedRoute";
import NavBar from "./components/navmenu/NavBar";

import PortfolioLayout from "./components/auditors/portfolio/PortfolioLayout";
import Registration from "./components/users/Registration";
import Login from "./components/users/Login";

import { logoutUser } from "./store/actions/auth";
import { clearApiErrors } from "./store/actions/error";
import CreatePortfolio from "./components/auditors/portfolio/CreatePortfolio";
import TaskLayout from "./components/auditors/task/TaskLayout";
import CreateTask from "./components/auditors/task/CreateTask";

function App(props) {
  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  };

  //Clear framework message
  props.history.listen((location, action) => {
    if (apiError != null) props.dispatch(clearApiErrors());
  });

  const { isAuthenticated, isVerifying, apiError } = props;
  return (
    <Container style={{ marginTop: 10 }}>
      {isAuthenticated && !isVerifying && (
        <NavBar logoutHandler={handleLogout} />
      )}
      <Switch>
        <ProtectedRoute
          exact
          // key={path}
          path="/portfolio"
          component={PortfolioLayout}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />
        <ProtectedRoute
          exact
          // key={path}
          path="/portfolio/create"
          component={CreatePortfolio}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />
        <ProtectedRoute
          exact
          // key={path}
          path="/portfolio/edit/:portfolioId"
          component={CreatePortfolio}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />
        <ProtectedRoute
          exact
          // key={path}
          path="/portfolio/:id"
          component={TaskLayout}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />
        <ProtectedRoute
          exact
          // key={path}
          path="/portfolio/:id/task/create"
          component={CreateTask}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />
        <ProtectedRoute
          exact
          // key={path}
          path="/portfolio/:id/task/edit/:taskId"
          component={CreateTask}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />
        <ProtectedRoute
          exact
          // key={path}
          path="/"
          component={PortfolioLayout}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          apiError={apiError}
        />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
      </Switch>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    apiError: state.errors,
  };
}

export default withRouter(connect(mapStateToProps)(App));
