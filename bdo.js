const Bank = require('./bank.js');

class Bdo extends Bank {
    constructor(loanAmount) {
        super(loanAmount, 1.7);
    }
}

module.exports = Bdo;