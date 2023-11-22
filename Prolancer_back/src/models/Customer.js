const connectDb = require('../common/connectdb.js');

var Customer = function (Customer) {
    this.FreelancerID = Customer.FreelancerID;
    this.AccountID = Customer.AccountID;
    this.firstName = Customer.firstName;
    this.lastName = Customer.Description;
    this.Description = Customer.Description;
};


Customer.getCustomerInfo = function (accountID, results) {
    connectDb.query("SELECT c.*, a.* FROM Customer c INNER JOIN Account a ON c.AccountID = a.AccountID WHERE c.AccountID = ?",
        [accountID], (err, res) => {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}


Customer.updateCustomerInfo = function (data, accountID, results) {
    connectDb.query("UPDATE Customer SET ? WHERE AccountID = ?",
        [data, accountID], (err, res) => {
            if (err) {
                results(null, err);
            }
            else {
                results(null, res);
            }
        })
}
module.exports = Customer;