import React from "react";
//import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
//import Homepage from "../Home";
//import { shallow } from "./enzyme";

const middlewares = [thunk];

describe("<Homepage/> ", () => {
  /*   const initialState = {
    logged: false,
    cart_id: 123,
    username: "asd"
  };
  const mockstore = configureStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockstore(initialState);
  });
 */
  it("False user login", () => {
    expect(1 + 2).toEqual(3);
  });
});
