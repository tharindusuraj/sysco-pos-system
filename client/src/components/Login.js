import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Row
} from "reactstrap";
import "./Login.css";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
import AppNavBar from "./AppNavBar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      validate: {
        emailState: ""
      },
      signInUp: "In"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  detectLogin = () => {
    this.props.detectLogin.bind(this, true);
  };

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  formChange = sign => {
    this.setState({ signInUp: sign });
  };

  submitLogin(e) {
    e.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    //Post and wait for the response from mongodb
    //If login success, save the cart id.
    axios
      .post("http://localhost:5000/api/users/login", credentials)
      .then(res => {
        if (res.data) {
          if (res.data.success === true) {
            this.props.onLogin(res.data.id, res.data.name); //pass cart id to logReducer

            //Set cookies to save user_id and user_name
            this.props.cookies.set("loggedUserId", res.data.id, {
              path: "/",
              maxAge: 100
            });
            this.props.cookies.set("loggedUserName", res.data.name, {
              path: "/",
              maxAge: 100
            });
          }
        }
      })
      .catch(err => console.log(err));
  }

  submitSignup(e) {
    e.preventDefault();

    const credentials = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password
    };

    axios
      .post("http://localhost:5000/api/users/register", credentials)
      .then(res => {
        if (res.data) {
          if (res.data.name === this.state.username) {
            alert("Signup succeful!");
            this.formChange("In");
          }
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { username, email, password } = this.state;
    if (this.state.signInUp === "In") {
      return (
        <div>
          <Container className="Login">
            <h2>Sign In</h2>
            <Form
              className="form"
              onSubmit={e => this.submitLogin(e)}
              size="sm"
            >
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    //type="email"
                    name="email"
                    //id="exampleEmail"
                    placeholder="Enter your email here"
                    value={email}
                    valid={this.state.validate.emailState === "has-success"}
                    invalid={this.state.validate.emailState === "has-danger"}
                    onChange={e => {
                      this.validateEmail(e);
                      this.handleChange(e);
                    }}
                  />
                  <FormFeedback valid />
                  <FormFeedback>Please input a correct email.</FormFeedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    //id="examplePassword"
                    placeholder="********"
                    value={password}
                    onChange={e => this.handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <Row>
                  <Button>Submit</Button>
                  <Button
                    onClick={this.formChange.bind(this, "Up")}
                    style={{ marginLeft: "5px" }}
                  >
                    Sign Up
                  </Button>
                </Row>
              </Col>
            </Form>
          </Container>
        </div>
      );
    } else {
      return (
        <Router>
          <AppNavBar />
          <Container className="Login">
            <h2>Sign Up</h2>
            <Form
              className="form"
              onSubmit={e => this.submitSignup(e)}
              size="sm"
            >
              <Col>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    name="username"
                    placeholder="Enter username here"
                    value={username}
                    onChange={e => {
                      //this.validateEmail(e);
                      this.handleChange(e);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    //type="email"
                    name="email"
                    //id="exampleEmail"
                    placeholder="Enter your email here"
                    value={email}
                    valid={this.state.validate.emailState === "has-success"}
                    invalid={this.state.validate.emailState === "has-danger"}
                    onChange={e => {
                      this.validateEmail(e);
                      this.handleChange(e);
                    }}
                  />
                  <FormFeedback valid />
                  <FormFeedback>Please input a correct email.</FormFeedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={e => this.handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Row>
                <Button>Submit</Button>{" "}
                <Button
                  onClick={this.formChange.bind(this, "In")}
                  style={{ marginLeft: "5px" }}
                >
                  Log In
                </Button>
              </Row>
            </Form>
          </Container>
        </Router>
      );
    }
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    logged: state.logged,
    cart: state.cart_id
  };
};

const matchDispatchToProps = dispatch => {
  return {
    onLogin: (cart, name) =>
      dispatch({ type: "LOG_IN", cart: cart, username: name }),
    onLogout: () => dispatch({ type: "LOG_OUT" })
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Login);
