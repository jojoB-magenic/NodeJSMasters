const LoanCalculator = require('./loancalculator.js');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let loanCalculator = new LoanCalculator(argv.bankname, argv.loanamount, argv.loanterm);
console.log(loanCalculator.getMonthlyInstallment());
