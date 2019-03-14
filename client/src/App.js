import React, { Component } from "react";
import Homepage from "./Home";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { withCookies } from "react-cookie";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Homepage />
      </CookiesProvider>
    );
  }
}

export default App;
