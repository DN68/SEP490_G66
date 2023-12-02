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


Customer.createCustomer = function (accountID, firstName, lastName, profilePicture, location, phone, companyName, companyAddress, taxCode, result) {
    connectDb.query("INSERT INTO Customer SET AccountID = ?,  First_Name = ?, Last_Name = ?, Profile_Picture = ?,  Location = ?, Phoneno = ?, CompanyName = ?, CompanyAddress = ?, TaxCode = ?",
        [accountID, firstName, lastName, profilePicture, location, phone, companyName, companyAddress, taxCode], function (err, res) {
            if (err) {
                result(null, err);
            }
            else {
                result(null, res);
            }
        })
}

Customer.getAllCustomersWithPaging = function (status, search, limit, offset, account, pagination) {
    var sql = "Select * from Customer c INNER JOIN Account a ON a.AccountID = c.AccountID WHERE";
    var sqlCount = "Select COUNT(*) AS count from Customer c INNER JOIN Account a ON a.AccountID = c.AccountID WHERE";
    
    console.log("sql: ", sql);
    console.log("sqlCount: ", sqlCount);
  
    var check = connectDb.query(sql + " a.Role = 'C' AND a.Status = ? AND a.Email LIKE ? LIMIT ? OFFSET ?", [status,'%' + search + '%',limit, offset], function (err, res) {
      if (err) {
        console.log("error: ", err);
        account(err,null)
      }
      else {
  
        account(null,res);
      }
    });
  
    connectDb.query(sqlCount + " a.Role = 'C' AND a.Status = ? AND a.Email LIKE ?", [status, '%' + search + '%'], function (err, res) {
      if (err) {
  
        pagination(err,null);
      }
      else {
        pagination(null,res);
      }
    });
  
    
  }

module.exports = Customer;