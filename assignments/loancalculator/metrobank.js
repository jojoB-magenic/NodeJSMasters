const Bank = require('./bank.js');

class Metrobank extends Bank {
    constructor(loanAmount) {
        super(loanAmount, 1.5);
    }
}

module.exports = Metrobank;