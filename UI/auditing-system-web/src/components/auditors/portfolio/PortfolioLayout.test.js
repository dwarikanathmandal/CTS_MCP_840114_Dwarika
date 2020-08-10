import React from "react";
import { shallow } from "enzyme";
import { createMemoryHistory } from "history";

import PortfolioLayout from "./PortfolioLayout";


const history = createMemoryHistory();
const searchValue = "CTS";

describe("Portfolio layout", () => {
  const wrapper = shallow(
    <PortfolioLayout.WrappedComponent history={history} />
  );

  let buttons = wrapper.find("Button");

  it("should render component", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should have an search field", () => {
    expect(wrapper.find('Input[type="search"]').length).toEqual(1);
  });

  it("should render search button", () => {
    expect(buttons.get(0).props.children).toEqual("Search");
  });

  it("should render search button", () => {
    expect(buttons.get(1).props.children).toEqual("Create Portfolio");
  });

  it("should set the search data and pass it to List", () => {
    wrapper.find('Input[type="search"]').simulate("change", {
      target: {
        value: searchValue,
      },
    });

    expect(
      wrapper.find("withRouter(Connect(PortfolioList))").props().searchText
    ).toEqual(searchValue);
  });

  it("should redirect to /portfolio/create", () => {
    buttons.at(1).simulate("click");
    expect(history.location.pathname).toEqual("/portfolio/create");
  });

  it("should render portfolio list to apply search", () => {
    buttons.at(0).simulate("click");
    expect(
      parseInt(wrapper.find("withRouter(Connect(PortfolioList))").key())
    ).toBeGreaterThanOrEqual(2);
  });

  it("should set the search data  to blank and clear search", () => {
    wrapper.find('Input[type="search"]').simulate("change", {
      target: {
        value: "",
      },
    });

    expect(
      wrapper.find("withRouter(Connect(PortfolioList))").props().searchText
    ).toEqual("");
  });
});
