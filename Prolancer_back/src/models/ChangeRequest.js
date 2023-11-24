const connectDb = require('../common/connectdb.js');

var ChangeRequest = function (changeRequest) {
  this.ChangeRequestID = changeRequest.ChangeRequestID;
  this.CreateByID = changeRequest.CreateByID;
  this.Request_Title = changeRequest.Request_Title;
  this.Request_Description = changeRequest.Request_Description;
  this.Create_At = changeRequest.Create_At;
  this.Status = changeRequest.Status;
  this.Request_Action = changeRequest.Request_Action;
  this.OrderID = changeRequest.OrderID;
  this.Request_Type = changeRequest.Request_Type;
};

ChangeRequest.createChangeRequest = function (changeRequest, result) {
  const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
  
  connectDb.query("INSERT INTO `ChangeRequest` (`ChangeRequestID`, `CreateByID`, `Request_Title`, `Request_Description`, `Create_At`, `Status`, `Request_Extend_Day`, `OrderID`, `Request_Type`) VALUES (NULL, ?, ?, ?, ?, 'Pending', ?, ?, ?)", [changeRequest.CreateByID, changeRequest.Request_Title, changeRequest.Request_Description, date, changeRequest.ExtendDay, changeRequest.OrderID, changeRequest.requestType], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};



ChangeRequest.getChangeRequestWithPagingAndFilter = function (userId,userRole,requestType,status,limit, offset, changeRequest, pagination) {
  var sqlForCustomerAndFreelancer ="SELECT cr.*, a.Username FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%' AND cr.CreateByID = "+userId+" ORDER BY cr.ChangeRequestID ASC LIMIT ? OFFSET ?";
  var sqlForAdmin = "SELECT cr.*, a.Username FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%' ORDER BY cr.ChangeRequestID ASC LIMIT ? OFFSET ?";
  var sql;
  var sqlCountForCustomerAndFreelancer="Select COUNT(*) AS count FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%' AND cr.CreateByID = "+userId;
  var sqlCountForAdmin="SELECT COUNT(*) AS count FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%'";
  var sqlCount;
  if(userRole=='C'||userRole=='F'){
    console.log("🚀 ~ file: Order.js ~ userRole: Customer Freelancer",);
    
    sql = sqlForCustomerAndFreelancer;
    sqlCount = sqlCountForCustomerAndFreelancer;
    if(userRole=='C'&&requestType=='Extend'){
      sql = "SELECT cr.*, a.Username FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.OrderID IN (SELECT o.OrderID FROM `Order` o INNER JOIN `OrderRequest` ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN `Customer` c ON c.CustomerID = ro.CustomerID WHERE c.AccountID = "+userId+") AND cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%' ORDER BY cr.ChangeRequestID ASC LIMIT ? OFFSET ?";
      sqlCount = "SELECT COUNT(*) AS count FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.OrderID IN (SELECT o.OrderID FROM `Order` o INNER JOIN `OrderRequest` ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN `Customer` c ON c.CustomerID = ro.CustomerID WHERE c.AccountID = "+userId+") AND cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%'";
      console.log("🚀 ~ file: Order.js ~ userRole: Customer Extend",);
    }
  }else{
    console.log("🚀 ~ file: Order.js ~ userRole: Admin",);

    sql = sqlForAdmin;
    sqlCount = sqlCountForAdmin;

  }
  console.log(sql);
 var data = connectDb.query(sql, [requestType, limit, offset], function (err, res) {
    if (err) {
      changeRequest(err, null);
    }
    else {
      changeRequest(null, res);
    }
  });
  connectDb.query(sqlCount, [requestType], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });
};

ChangeRequest.changeChangeRequestStatus = function (status,changeRequestID, result) {
  connectDb.query("UPDATE `ChangeRequest` SET `Status` = ? WHERE `ChangeRequest`.`ChangeRequestID` = ?", [status,changeRequestID], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};


module.exports = ChangeRequest;