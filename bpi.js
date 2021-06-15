const Bank = require('./bank.js');

class Bpi extends Bank {
    constructor(loanAmount) {
        super(loanAmount, 1.2);
    }
}

module.exports = Bpi;