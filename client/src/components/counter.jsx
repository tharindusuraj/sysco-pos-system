import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: 1 //this.props.value
  };
  render() {
    console.log("props", this.props);
    let classes = this.getBadgeClasses();

    return (
      <div>
        <button
          onClick={this.btnClick_plus}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <label className="badge m-2 badge-primary">{this.formatCount()}</label>

        <button
          onClick={this.btnClick_minus}
          className="btn btn-secondary btn-sm"
        >
          -
        </button>
      </div>
    );
  }

  btnClick_plus = () => {
    this.setState({ value: this.state.value + 1 });
  };

  btnClick_minus = () => {
    this.setState({ value: this.state.value - 1 });
    if (this.state.value <= 1) {
      this.setState({ value: 1 });
    }
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.state;

    return value;
  }
}

export default Counter;
