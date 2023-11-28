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



Freelancer.getAllFreelancersWithPaging = function (status, search, limit, offset, account, pagination) {
  var sql = "Select * from Freelancer f INNER JOIN Account a ON a.AccountID = f.AccountID WHERE";
  var sqlCount = "Select COUNT(*) AS count from Freelancer f INNER JOIN Account a ON a.AccountID = f.AccountID WHERE";
  
  console.log("sql: ", sql);
  console.log("sqlCount: ", sqlCount);

  var check = connectDb.query(sql + " a.Role = 'F' AND a.Status = ? AND a.Email LIKE ? LIMIT ? OFFSET ?", [status,'%' + search + '%',limit, offset], function (err, res) {
    if (err) {
      console.log("error: ", err);
      account(err,null)
    }
    else {

      account(null,res);
    }
  });

  connectDb.query(sqlCount + " a.Role = 'F' AND a.Status = ? AND a.Email LIKE ?", [status, '%' + search + '%'], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });

  
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