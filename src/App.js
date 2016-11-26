import React, { Component } from 'react';
import './App.css';

class LoanParameters extends Component {
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
      <div>
        <label>Loan amount
          <input id="amount" type="text" onChange={this.handleAmountChange}/>
        </label>
        <label>Down payment years
          <input id="years" type="text" onChange={this.handleTimeChange}/>
        </label>
        <label>Interest rate
          <input id="rate" type="text" onChange={this.handleRateChange}/>
        </label>    
      </div>
    );
  }
}

class CalculatedPayment extends Component {
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

CalculatedPayment.propTypes = {
  payment: React.PropTypes.number
};

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
