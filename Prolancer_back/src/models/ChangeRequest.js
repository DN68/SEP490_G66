const connectDb = require('../common/connectdb.js');

var ChangeRequest = function (orderRequest) {
  this.OrderRequestID = orderRequest.OrderRequestID;
  this.CreateByID = orderRequest.CreateByID;
  this.Request_Title = orderRequest.Request_Title;
  this.Request_Description = orderRequest.Request_Description;
  this.Create_At = orderRequest.Create_At;
  this.Status = orderRequest.Status;
  this.Request_Action = orderRequest.Request_Action;
  this.OrderID = orderRequest.OrderID;
  this.Request_Type = orderRequest.Request_Type;
};

ChangeRequest.createOrderRequest = function (orderRequest, result) {
  const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
  
  connectDb.query("INSERT INTO `OrderRequest` (`OrderRequestID`, `CreateByID`, `Request_Title`, `Request_Description`, `Create_At`, `Status`, `Request_Action`, `OrderID`, `Request_Type`) VALUES (NULL, ?, ?, ?, ?, 'Pending', ?, ?, ?)", [orderRequest.CreateByID, orderRequest.Request_Title, orderRequest.Request_Description, date, orderRequest.Request_Action, orderRequest.OrderID, orderRequest.requestType], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};



ChangeRequest.getOrderRequestWithPagingAndFilter = function (userId,userRole,requestType,status,limit, offset, orderRequest, pagination) {
  var sqlForCustomerAndFreelancer ="SELECT request.*, u.First_Name as CreateByFirstName, u.Last_Name as CreateByLastName, u.Profile_Picture as CreateByProfilePicture, o.FreelancerID, o.CustomerID FROM `OrderRequest` request INNER JOIN `User` u ON request.CreateByID = u.UserID INNER JOIN `Order` o ON request.OrderID = o.OrderID WHERE (request.CreateByID = "+userId+" OR o.CustomerID = "+userId+" OR o.FreelancerID = "+userId+") AND request.Request_Type = ? AND request.Status LIKE '%"+status+"%' ORDER BY request.OrderRequestID ASC LIMIT ? OFFSET ?";
  var sqlForAdmin = "SELECT * FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE request.Request_Type = ? AND cr.Status LIKE '%"+status+"%' ORDER BY cr.OrderRequestID ASC LIMIT ? OFFSET ?";
  var sql;
  var sqlCountForCustomerAndFreelancer="Select COUNT(*) AS count FROM `OrderRequest` request INNER JOIN `User` u ON request.CreateByID = u.UserID INNER JOIN `Order` o ON request.OrderID = o.OrderID WHERE (request.CreateByID = "+userId+" OR o.CustomerID = "+userId+" OR o.FreelancerID = "+userId+") AND request.Request_Type = ? AND request.Status LIKE '%"+status+"%'";
  var sqlCountForAdmin="SELECT COUNT(*) AS count FROM `ChangeRequest` cr INNER JOIN `Account` a ON a.AccountID = cr.CreateByID WHERE cr.Request_Type = ? AND cr.Status LIKE '%"+status+"%'";
  var sqlCount;
  if(userRole=='C'||userRole=='F'){
    console.log("🚀 ~ file: Order.js ~ userRole: Customer Freelancer",);
    
    sql = sqlForCustomerAndFreelancer;
    sqlCount = sqlCountForCustomerAndFreelancer;
  }else{
    console.log("🚀 ~ file: Order.js ~ userRole: Admin",);

    sql = sqlForAdmin;
    sqlCount = sqlCountForAdmin;

  }
  console.log(sql);
 var data = connectDb.query(sql, [requestType, limit, offset], function (err, res) {
    if (err) {
      orderRequest(err, null);
    }
    else {
      orderRequest(null, res);
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

ChangeRequest.changeOrderRequestStatus = function (status,orderID, result) {
  connectDb.query("UPDATE `OrderRequest` SET `Status` = ? WHERE `OrderRequest`.`OrderRequestID` = ?", [status,orderID], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};


module.exports = ChangeRequest;