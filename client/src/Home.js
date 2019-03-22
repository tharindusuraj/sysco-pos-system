import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavBar from "./components/AppNavBar";
import ShoppingListModal from "./components/ShoppingListModal";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import Login from "./components/Login";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

var cart_id = ""; //cart_id of the logged user
var name = ""; //user name

class Homepage extends Component {
  //Check for a logged user at the beginning
  componentDidMount() {
    if (this.props.cookies.get("loggedUserId")) {
      cart_id = this.props.cookies.get("loggedUserId");
      name = this.props.cookies.get("loggedUserName");
      this.props.onLogin(cart_id, name);
    }
  }

  render() {
    if (this.props.logged) {
      return (
        <Provider store={store}>
          <div className="App">
            <AppNavBar
              isLoggedin={this.props.logged}
              username={this.props.username}
            />
            <Container>
              <ShoppingListModal cart_id={this.props.cart_id} />
              <ItemModal cart_id={this.props.cart_id} />
            </Container>
          </div>
        </Provider>
      );
    } else {
      return (
        <div className="App">
          <AppNavBar
            isLoggedin={this.props.logged}
            cookies={this.props.cookies}
          />

          <Container>
            <Login cookies={this.props.cookies} />
          </Container>
        </div>
      );
    }
  }
}

const matchDispatchToProps = dispatch => {
  return {
    onLogin: (cart, name) =>
      dispatch({ type: "LOG_IN", cart: cart_id, username: name })
  };
};

const mapStateToProps = state => {
  return {
    logged: state.logged,
    cart_id: state.cart_id,
    username: state.username
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withCookies(Homepage));
