import React, { Component } from 'react';
import CalculatedPayment from './CalculatedPayment.js'
import LoanParameters from './LoanParameters.js'
import '../App.css';
import {calculateLoan} from '../utils/calculateLoanApi.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      payment: null,
      loanAmount : null,
      paymentTime: null,
      interestRate: null
    };
    this.handleCalculateClick = this.handleCalculateClick.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleInterestRateChange = this.handleInterestRateChange.bind(this);
    this.handlePaymentTimeChange = this.handlePaymentTimeChange.bind(this);
  }

  handleCalculateClick() {
    if (this.state.loanAmount != null && this.state.interestRate != null && this.state.paymentTime != null) {
      var today = new Date();
      var loanParameters = {
        date: today,
        loanAmount: this.state.loanAmount,
        interestRate: this.state.interestRate,
        paymentTime: this.state.paymentTime
      }
      calculateLoan(loanParameters)
        .then(data => {
          var payment = 0;
          if (data.amortizationSchedule && data.amortizationSchedule.length > 0) {
            payment = data.amortizationSchedule[0].payment;
          }

          this.setState({ payment });
        })

    } else {
      // TODO Please fill in all fields
    }
  }

  handleAmountChange(loanAmount) {
    this.setState({ loanAmount });
  }

  handleInterestRateChange(interestRate) {
    this.setState({ interestRate });
  }

  handlePaymentTimeChange(paymentTime) {
    this.setState({ paymentTime });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Loan Calculator</h1>
        </div>
        <div>
          <LoanParameters
            onAmountChange={this.handleAmountChange}
            onRateChange={this.handleInterestRateChange}
            onTimeChange={this.handlePaymentTimeChange} />
        </div>
        <div>
        <button onClick={this.handleCalculateClick}>Calculate</button>
        </div>
        <div className="App-content">
          <CalculatedPayment payment={this.state.payment}/>
        </div>
      </div>
    );
  }
}

export default App;
