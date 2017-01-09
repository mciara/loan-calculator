import React, { Component } from 'react';

export default class LoanParameters extends Component {
  constructor() {
    super();
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleAmountChange (event) {
    this.props.onAmountChange(event.target.value);
  }

  handleRateChange (event) {
    this.props.onRateChange(event.target.value);
  }

  handleTimeChange (event) {
    this.props.onTimeChange(event.target.value);
  }

  render() {
    return (
      <form>
        <label>Loan amount
          <input id="amount" required type="number" min="10000" max="100000000" pattern="\d+" onChange={this.handleAmountChange}/>
        </label>
        <label>Down payment years
          <input id="years" required type="number" min="1" max="40" step="1" pattern="\d+" onChange={this.handleTimeChange}/>
        </label>
        <label>Interest rate
          <input id="rate" required type="number" min="0" max="20" step="0.01" pattern="\d+" onChange={this.handleRateChange}/>
        </label>
      </form>
    );
  }
}
