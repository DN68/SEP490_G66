const connectDb = require('../common/connectdb.js');

var Freelancer = function (freelancer) {
  this.FreelancerID = freelancer.FreelancerID;
  this.AccountID = freelancer.AccountID;
  this.firstName = freelancer.firstName;
  this.lastName = freelancer.Description;
  this.Description = freelancer.Description;
};


Freelancer.getFreelancerInfo = function (accountID, results) {
  connectDb.query("SELECT f.*, a.* FROM Freelancer f INNER JOIN Account a ON f.AccountID = a.AccountID WHERE f.AccountID = ?",
    [accountID], (err, res) => {
      if (err) {
        results(null, err);
      }
      else {
        results(null, res);
      }
    })
}


Freelancer.updateFreelancerInfo = function (data, accountID, results) {
  connectDb.query("UPDATE Freelancer SET ? WHERE AccountID = ?",
    [data, accountID], (err, res) => {
      if (err) {
        results(null, err);
      }
      else {
        results(null, res);
      }
    })
}

module.exports = Freelancer;