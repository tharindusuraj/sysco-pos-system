import { Container, InputGroup, Input, Table, Col } from "reactstrap";

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
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

//Item list and prices
const item = [
  { name: "Guitar", price: 35000 },
  { name: "Tabla", price: 8000 },
  { name: "Piano", price: 76000 },
  { name: "Organ", price: 47000 },
  { name: "Saxophone", price: 74000 },
  { name: "Violin", price: 6000 }
];

class ShoppingList extends Component {
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

  //Change the quantity of an item in the cart
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

    this.props.getItems(this.props.cart_id); //Update the states
  };

  //calculate the total price for each item
  priceCalc(name, count) {
    var index = item
      .map(function(obj) {
        return obj.name;
      })
      .indexOf(name);

    const val = item[index].price;
    return val * count;
  }

  render() {
    const { items } = this.props.item;
    if (items.length === 0)
      return (
        <Container>
          <TransitionGroup className="shopping-list" />
          <h5>Your cart is empty</h5>
        </Container>
      );
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
                        <Fab
                          className="remove-btn"
                          size="small"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </td>

                      <td style={{ width: "200px" }}>
                        <div style={{ marginTop: "10px" }}>{name}</div>
                      </td>

                      <td>
                        <div>
                          <InputGroup>
                            <Col md={{ size: 3 }}>
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
                                }}
                              />
                            </Col>
                          </InputGroup>
                        </div>
                      </td>
                      <td style={{ width: "100px" }}>
                        <div style={{ marginTop: "10px" }}>
                          Rs. {this.priceCalc(name, count)}
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
