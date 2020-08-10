//using react testing library

// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// Using enzyme
const dispatch = () => {
  return Promise.resolve();
};

import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { createMemoryHistory } from "history";
const props = {
  isAuthenticated: false,
  isVerifying: false,
  apiError: null,
};

const history = createMemoryHistory();

describe("<App>", () => {
  const wrapper = shallow(
    <App.WrappedComponent history={history} {...props} />
  );  

  it("render app component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render two <Route> component", () => {
    expect(wrapper.find("Route").length).toEqual(2);
  });

  it("should render 7 <ProtectedRoute/> component", () => {
    expect(wrapper.find("ProtectedRoute").length).toEqual(7);
  });

  it("should not render Navbar component if user is not authenticated", () => {
    expect(wrapper.find("Connect(NavBar)").length).toEqual(0);
  });

  const wrapperAuth = shallow(
    <App.WrappedComponent
      history={history}
      isAuthenticated={true}
      isVerifying={false}
      dispatch={dispatch}
    />
  );

  const fakeCallBack = () => console.log("Verfying custom event");

  it("should render Navbar component only if user is authenticated", () => {
    expect(wrapperAuth.find("Connect(NavBar)").length).toEqual(1);
  });
  it("should call logout", () => {
    wrapperAuth.find("Connect(NavBar)").prop("logoutHandler")(fakeCallBack);
  });

  const wrapperRoute = shallow(
    <App.WrappedComponent
      history={history}
      isAuthenticated={true}
      isVerifying={false}
      apiError="Error"
      dispatch={dispatch}
    />
  );

  it("should clear error", () => {
    history.push("/portfolio/create");
  });
});
