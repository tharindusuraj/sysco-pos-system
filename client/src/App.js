import React, { Component } from "react";
import Homepage from "./Home";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { createStore } from "redux";
import logReducer from "./reducers/logReducer";
import { CookiesProvider } from "react-cookie";

const logStore = createStore(logReducer);

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Provider store={logStore}>
          <Homepage />
        </Provider>
      </CookiesProvider>
    );
  }
}

export default App;
