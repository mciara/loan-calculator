const LOAN_CALCULATOR_ENDPOINT = 'https://cfs-ws-itera.cicero.no/cfp/6/ws/rest/calculator/calculateLoan'

export function calculateLoan(loanParameters) {
  var date = loanParameters.date;
  var raisingYear = date.getFullYear();
  var raisingMonth = date.getMonth() + 2; // + 2 to get the next month
  if (raisingMonth > 12) { // if the next month is January, a year has to be updated
    raisingMonth = 1;
    ++raisingYear;
  }
  var loanAmount = loanParameters.loanAmount
  var interestRate = loanParameters.interestRate
  var paymentTimeInMonths = loanParameters.paymentTime * 12

  return fetch(LOAN_CALCULATOR_ENDPOINT +
     `?loanRaisingMonth=${raisingMonth}` +
     `&loanRaisingYear=${raisingYear}` +
     `&principalAmount=${loanAmount}` +
     `&annualNominalInterestRate=${interestRate}` +
     `&totalNumberOfPayments=${paymentTimeInMonths}`
   )
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}
