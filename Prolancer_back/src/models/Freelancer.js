const connectDb = require('../common/connectdb.js');

var Freelancer = function (freelancer) {
  this.FreelancerID = freelancer.FreelancerID;
  this.AccountID = freelancer.AccountID;
  this.firstName = freelancer.firstName;
  this.lastName = freelancer.Description;
  this.Description = freelancer.Description;
};


Freelancer.getFreelancerInfo = function (accountID, results) {
  connectDb.query("SELECT f.*, a.*, c.Category_Name, cv.CV_Upload FROM Freelancer f INNER JOIN Account a ON f.AccountID = a.AccountID INNER JOIN CV cv ON cv.FreelancerID = f.FreelancerID  INNER JOIN Category c ON c.CategoryID = f.MainCategoryID WHERE f.AccountID = ?",
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
  console.log(status)
  var sql = "Select a.*, f.*, c.Category_Name, c.Description AS CategoryDescription, c.Status AS CategoryStatus, cv.CV_Upload, cv.Status AS cvStatus from Freelancer f INNER JOIN Account a ON a.AccountID = f.AccountID INNER JOIN CV cv ON cv.FreelancerID = f.FreelancerID INNER JOIN Category c ON c.CategoryID = f.MainCategoryID WHERE";
  var sqlCount = "Select COUNT(*) AS count from Freelancer f INNER JOIN Account a ON a.AccountID = f.AccountID INNER JOIN CV cv ON cv.FreelancerID = f.FreelancerID INNER JOIN Category c ON c.CategoryID = f.MainCategoryID WHERE";
  
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

Freelancer.createFreelancer = function (accountID, firstName, lastName, profilePicture, location, description, phone, mainCategoryID, result) {
  connectDb.query("INSERT INTO Freelancer SET AccountID = ?,  First_Name = ?, Last_Name = ?, Profile_Picture = ?,  Location = ?, Description = ?, Phoneno = ?, MainCategoryID = ?",
      [accountID, firstName, lastName, profilePicture, location, description, phone, mainCategoryID], function (err, res) {
          if (err) {
              result(null, err);
          }
          else {
              result(null, res);
          }
      })
}

Freelancer.getFreelancerByAccountID = function (accountId, results) {
  connectDb.query("SELECT * FROM Freelancer WHERE AccountID = ?",
      [accountId], function (err, res) {
          if (err) {
              results(null, err);
          }
          else {
              results(null, res);
          }
      })
}

module.exports = Freelancer;