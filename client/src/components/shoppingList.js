import {
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
  Col
} from "reactstrap";

import { Transition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getItems,
  deleteItem,
  addItem,
  updateItem
} from "../actions/itemActions";
import PropTypes from "prop-types";

var cart = "";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: 1, //this.props.value
    cart: ""
  };

  componentDidMount() {
    this.props.getItems(this.props.cart_id);
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  changeValue = (func, count, name) => {
    const item_details = {
      cart: this.props.cart_id,
      name: name,
      count: count
    };

    axios
      .patch("http://localhost:5000/api/items", item_details)
      .then(res => {
        if (res.data) {
        }
      })
      .catch(err => console.log(err));
  };

  formatCount() {
    const { value } = this.state;

    return value;
  }

  render() {
    const { items } = this.props.item;
    //cart = this.props.cart_id;
    //console.log(cart);
    return (
      <div>
        <Container>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, count }) => (
              <Transition key={_id} timeout={200} className="">
                <Table size="sm">
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>

                        {name}
                      </td>

                      <td>
                        <div>
                          <InputGroup>
                            <Col sm={1} md={{ size: 2, offset: 3 }}>
                              <Input
                                type="number"
                                step="1"
                                defaultValue={count}
                                onChange={e => {
                                  this.changeValue(
                                    this.props.updateItem,
                                    e.target.value,
                                    name
                                  );

                                  //console.log(e.target.value);
                                }}
                              />
                            </Col>
                          </InputGroup>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Transition>
            ))}
          </TransitionGroup>
        </Container>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, addItem, updateItem }
)(ShoppingList);
