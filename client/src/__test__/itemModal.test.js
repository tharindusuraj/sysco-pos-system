import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { shallow } from "./enzyme";
import { NavbarBrand, Button, AppNavBar, Container } from "reactstrap";
import ItemModal from "../components/ItemModal";

const middlewares = [thunk];

describe("<Homepage/> ", () => {
  const initialState = {
    state: []
  };

  const mockStore = configureStore(middlewares);

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("Home heading test", () => {
    const wrapper = shallow(
        <ItemModal />
    );

    //console.log(wrapper.debug());

    expect(wrapper).toMatchSnapshot();
  });
});
