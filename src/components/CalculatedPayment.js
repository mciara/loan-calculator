import React, { Component } from 'react';

export default class CalculatedPayment extends Component {
  render() {
    if (this.props.payment !== null) {
      return (
        <div>
          <h2>Monthly Payment</h2>
          <h2>
            {Math.round(this.props.payment)}
          </h2>
        </div>
      );
    } else {
      return (<div/>);
    }
  }
}
