import React, { Component } from "react";
import Homepage from "./Home";
import { CookiesProvider } from "react-cookie";

class App extends Component {
  render() {
    return (
      <div>
        <CookiesProvider>
          <Homepage />
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
