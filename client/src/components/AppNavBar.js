import React, { Component } from "react";
import { withCookies } from "react-cookie";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from "reactstrap";

var welcome_msg;
var btn_caption;

class AppNavBar extends Component {
  state = {
    isOpen: false,
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    //this.setState({ isOpen: !this.state.isOpen });
  };

  //Clear cookies when looged out
  logOut = () => {
    this.props.cookies.remove("loggedUserId", { path: "/" });
    this.props.cookies.remove("loggedUserName", { path: "/" });
  };

  render() {
    if (this.props.isLoggedin === false) {
      welcome_msg = "";
      btn_caption = "Log In";
    } else {
      welcome_msg = "Welcome " + this.props.username + "!";
      btn_caption = "Logout";
    }
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Sysco POS System</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>{welcome_msg}</NavLink>
              </NavItem>

              <Collapse isOpen={this.state.isOpen} navbar />

              <Button
                onClick={this.logOut.bind(this)}
                color="secondary"
                size="sm"
                href="/"
              >
                {btn_caption}
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withCookies(AppNavBar);
