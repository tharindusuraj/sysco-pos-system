import React, { Component } from "react";
import { Button, Table, Card, CardImg, CardText, CardBody } from "reactstrap";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { addItem, getItems } from "../actions/itemActions";
import tabla from "../Img/tabla.jpg";
import piano from "../Img/piano.jpg";
import organ from "../Img/organ.jpg";
import guitar from "../Img/guitar.jpg";
import sax from "../Img/sax.jpg";
import violin from "../Img/violin.jpg";

//Shopping item details
const item = [
  { name: "Guitar", img: guitar, price: 35000 },
  { name: "Tabla", img: tabla, price: 8000 },
  { name: "Piano", img: piano, price: 76000 },
  { name: "Organ", img: organ, price: 47000 },
  { name: "Saxophone", img: sax, price: 74000 },
  { name: "Violin", img: violin, price: 6000 }
];

var cart = "";

function ItemCard(itmprop) {
  return (
    <Card style={{ color: "grey" }}>
      <CardImg src={item[itmprop.id].img} />
      <h3>{item[itmprop.id].name}</h3>
      <CardBody>
        <CardText>Rs. {item[itmprop.id].price}</CardText>
        <ReactNotification ref={itmprop.this.notificationDOMRef} />
        <Button
          onClick={() => {
            itmprop.this.props.addItem({
              cart: cart,
              name: item[itmprop.id].name,
              count: 1
            });
            itmprop.this.addAlert(item[itmprop.id].name);
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
    this.addNotification = this.addAlert.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  state = {
    modal: false,
    name: "",
    cart: "",
    item: item
  };

  onSubmit = e => {
    e.preventDefault();
  };

  //Notify when an item is added to the cart
  addAlert(name) {
    this.notificationDOMRef.current.addNotification({
      title: "Successful",
      message: name + " has been added to the cart!",
      type: "success",
      insert: "top",
      container: "bottom-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 1000 },
      dismissable: { click: true }
    });
  }

  render() {
    cart = this.props.cart_id;

    return (
      <div>
        <Table borderless>
          <tbody>
            <tr>
              <td>
                <ItemCard id="0" this={this} />
              </td>
              <td>
                <ItemCard id="1" this={this} />
              </td>

              <td>
                <ItemCard id="2" this={this} />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <ItemCard id="3" this={this} />
              </td>

              <td>
                <ItemCard id="4" this={this} />
              </td>
              <td>
                <ItemCard id="5" this={this} />
              </td>
            </tr>
          </tbody>
        </Table>
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
