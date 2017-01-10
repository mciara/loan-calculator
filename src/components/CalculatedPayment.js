import React from 'react';

var CalculatedPayment = props => {
    if (props.payment !== null) {
      return (
        <div>
          <h2>Monthly Payment</h2>
          <h2>
            {Math.round(props.payment)}
          </h2>
        </div>
      )
    } else {
      return (<div/>)
    }
  }

export default CalculatedPayment
