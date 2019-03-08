import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Card,
  CardImg,
  CardText,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import { addItem, getItems } from "../actions/itemActions";
//import ItemCard from "./ItemCard";
import tabla from "../Img/tabla.jpg";
import piano from "../Img/piano.jpg";
import organ from "../Img/organ.jpg";
import guitar from "../Img/guitar.jpg";
import sax from "../Img/sax.jpg";
import violin from "../Img/violin.jpg";

const item = [guitar, tabla, piano, organ, sax, violin];
var cart = "";

function ItemCard(itmprop) {
  return (
    <Card>
      <CardImg width="30%" src={item[itmprop.id]} />
      <h3>{itmprop.name}</h3>
      <CardBody>
        <CardText>Rs. {itmprop.price}</CardText>

        <Button
          onClick={() => {
            //console.log(cart);
            itmprop.this.toggle();
            itmprop.this.props.addItem({
              cart: cart,
              name: itmprop.name,
              count: 1
            });
          }}
          size="lg"
        >
          Add
        </Button>
      </CardBody>
    </Card>
  );
}

class ItemModal extends Component {
  constructor(props) {
    super(props);
  }

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
    cart = this.props.cart_id;
    //console.log(this.props);

    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Table borderless>
              <tbody>
                <tr>
                  <td>
                    <ItemCard id="0" name="Guitar" price="35000" this={this} />
                  </td>
                  <td>
                    <ItemCard id="1" name="Tabla" price="8000" this={this} />
                  </td>

                  <td>
                    <ItemCard id="2" name="Piano" price="98000" this={this} />
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>
                    <ItemCard
                      id="3"
                      name="Keyboard"
                      price="125000"
                      this={this}
                    />
                  </td>

                  <td>
                    <ItemCard
                      id="4"
                      name="Saxophone"
                      price="64000"
                      this={this}
                    />
                  </td>
                  <td>
                    <ItemCard id="5" name="Violin" price="6500" this={this} />
                  </td>
                </tr>
              </tbody>
            </Table>
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
)(ItemModal);
