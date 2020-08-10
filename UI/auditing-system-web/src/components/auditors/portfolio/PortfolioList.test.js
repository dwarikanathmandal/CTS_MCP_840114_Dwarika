import React from "react";
import { shallow } from "enzyme";
import { createMemoryHistory } from "history";
import PortfolioList, { PortfolioItem } from "./PortfolioList";

const history = createMemoryHistory();
const fakeCallBack = () => console.log("Verfying custom event");

const props = {
  portfolios: {
    portfolios: [
      {
        clientCode: "PSL",
        clientName: "Persistent",
        portfolioName: "PSL_YE_2020",
        portfolioDescription: "Test Description",
        id: "1ee795ac-4e92-4252-9025-5fa835946170",
        createDate: "2020-07-30T05:34:57.4273849",
        modifyDate: "0001-01-01T00:00:00",
        createdBy: "df38e0cb-1388-40e5-81ad-f5b53812162f",
        modifiedBy: null,
        onEditClick: fakeCallBack,
        onClick: fakeCallBack
      },
      {
        clientCode: "CTS",
        clientName: "Cognizant",
        portfolioName: "CTS_FY 20-21",
        portfolioDescription: null,
        id: "f210921d-e1c3-4abb-b50b-a5afb054d540",
        createDate: "2020-07-30T13:40:41.9307789",
        modifyDate: "0001-01-01T00:00:00",
        createdBy: "a1efe54c-ed94-4000-b4e8-4fe1ffc4c00b",
        modifiedBy: null,
        onEditClick: fakeCallBack,
        onClick: fakeCallBack,
      },
    ],
  },
  history: history,
};

describe("Portfolio layout", () => {
  const wrapper = shallow(<PortfolioList.WrappedComponent {...props} />);

  it("should render Portfolio List", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render two  <PortfolioItem/>", () => {
    expect(wrapper.find("PortfolioItem").length).toEqual(2);
  });

  it("should call row edit click function", () => {
    wrapper.find("PortfolioItem").at(0).prop("onEditClick")(fakeCallBack);
  });

  it("should call row click function", () => {
    wrapper.find("PortfolioItem").at(0).prop("onClick")(fakeCallBack);
  });

  it("should render PaginationControl", () => {
    expect(wrapper.find("PaginationControl").length).toEqual(1);
  });

  it("should call pageChangeHandler", () => {
    wrapper.find("PaginationControl").prop("onPageChanged")(fakeCallBack);
  });
});

describe("Portfolio Item", () => {
  const wrapper = shallow(
    <PortfolioItem {...props.portfolios.portfolios[0]} />
  );

  it("should render Portfolio List", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render porttfolio name in h4", () => {
    expect(wrapper.find("h4").props().children).toEqual(
      props.portfolios.portfolios[0].portfolioName
    );
  });

  it("should render edit button", () => {
    expect(wrapper.find("Button").props().children).toEqual("Edit");
  });

  it("should call editClickHandler", () => {
    wrapper.find("Button").simulate("click");
  });

  it("should call row click", () => {
    wrapper.find("Col").at(1).prop("onClick")(fakeCallBack);
  });

  //   it("should call editClickHandler", () => {
  //     wrapper.find("Button").simulate("click");
  //   });

  //   it("should render two  <PortfolioItem/>", () => {
  //     expect(wrapper.find("PortfolioItem").length).toEqual(2);
  //   });

  //   it("should render PaginationControl", () => {
  //     expect(wrapper.find("PaginationControl").length).toEqual(1);
  //   });

  
});
