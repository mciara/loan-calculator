import React, { Component } from 'react';
import CalculatedPayment from './CalculatedPayment.js'
import LoanParameters from './LoanParameters.js'
import './../App.css';

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
    var today = new Date();
    var raisingYear = today.getFullYear();
    var raisingMonth = today.getMonth() + 2; // + 2 to get the next month
    if (raisingMonth > 12) { // if the next month is January, a year has to be updated
      raisingMonth = 1;
      ++raisingYear;
    }

    if (this.state.loanAmount != null && this.state.interestRate != null && this.state.paymentTime != null) {
      fetch("https://cfs-ws-itera.cicero.no/cfp/6/ws/rest/calculator/calculateLoan?loanRaisingMonth=" + raisingMonth +
        "&loanRaisingYear=" + raisingYear +
        "&principalAmount=" + this.state.loanAmount +
        "&annualNominalInterestRate=" + this.state.interestRate +
        "&totalNumberOfPayments="+ this.state.paymentTime * 12)
      .then((response) => response.json())
      .then((responseJson) => {
        var payment = 0;
        if (responseJson.amortizationSchedule && responseJson.amortizationSchedule.length > 0) {
          payment = responseJson.amortizationSchedule[0].payment;
        }

        this.setState({ payment });
      })
      .catch((error) => {
        console.error(error);
      });
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
