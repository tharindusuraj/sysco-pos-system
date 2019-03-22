import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { addItem, getItems } from "../actions/itemActions";
import ShoppingList from "./shoppingList";

class ShoppingListModal extends Component {
  state = {
    modal: false,
    name: "",
    cart: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          style={{ marginLeft: "1000px" }}
          onClick={this.toggle}
        >
          Cart
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Shopping Cart</ModalHeader>
          <ModalBody>
            <ShoppingList cart_id={this.props.cart_id} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToitmprops = state => ({
  item: state.item
});

export default connect(
  mapStateToitmprops,
  { getItems, addItem }
)(ShoppingListModal);
