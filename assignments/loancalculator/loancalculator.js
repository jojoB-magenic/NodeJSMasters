const Bdo = require('./bdo.js');
const Bpi = require('./bpi.js');
const Metrobank = require('./metrobank.js');

class LoanCalculator {
    constructor(bankName, loanAmount, loanTerm) {
        this.bankName = bankName;
        this.loanAmount = loanAmount;
        this.loanTerm = loanTerm;
    }

    getMonthlyInstallment () {

        let bank;

        if (this.bankName === 'bdo') {
            bank = new Bdo(this.loanAmount);
        } else if (this.bankName === 'bpi') {
            bank = new Bpi(this.loanAmount);
        } else {
            bank = new Metrobank(this.loanAmount);
        }

        return `Monthly Installment : ${bank.getMonthlyInstallment(this.loanTerm)}`;
    }
}

module.exports = LoanCalculator;