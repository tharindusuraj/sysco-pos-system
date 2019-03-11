import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import Homepage from "../Home";
import { mount } from "./enzyme";
import { NavbarBrand, Button, AppNavBar } from "reactstrap";

const middlewares = [thunk];

describe("<Homepage/> ", () => {
  const initialState = {
    logged: false,
    cart_id: "123sfd",
    username: "asdfa213",
    onLogin: jest.fn()
  };

  const mockStore = configureStore(middlewares);

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("Home heading test", () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </CookiesProvider>
    );

    //console.log(wrapper.debug());

    expect(wrapper.contains(<h2>Sign In</h2>)).toBeTruthy();
  });

  it("Home button test", () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </CookiesProvider>
    );

    expect(
      wrapper.contains(
        <label htmlFor="examplePassword" className="">
          Password
        </label>
      )
    ).toBeTruthy();
  });

  it("Home Navbar test", () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </CookiesProvider>
    );

    expect(
      wrapper.contains(
        <a href="/" className="navbar-brand">
          Sysco POS System
        </a>
      )
    ).toBeTruthy();
  });
});
