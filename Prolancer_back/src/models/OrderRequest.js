const connectDb = require('../common/connectdb.js');

var OrderRequest = function (orderRequest) {
  this.OrderRequestID = orderRequest.OrderRequestID;
  this.CustomerID = orderRequest.CreateByID;
  this.GigID = orderRequest.Request_Title;
  this.JobDescription = orderRequest.Request_Description;
  this.TotalEstimation = orderRequest.Create_At;
  this.StartFrom = orderRequest.Status;
  this.EndAt = orderRequest.Request_Action;
  this.Status = orderRequest.Request_Type;
  this.Note = orderRequest.Note;

};

OrderRequest.createOrderRequest = function (orderRequest, result) {
  const dateStart = require('moment')(orderRequest.StartFrom).format('YYYY-MM-DD HH:mm:ss');
  const dateEnd = require('moment')(orderRequest.EndAt).format('YYYY-MM-DD HH:mm:ss');
  connectDb.query("INSERT INTO `OrderRequest` (`OrderRequestID`, `CustomerID`, `GigID`, `JobDescription`, `TotalEstimation`, `StartFrom`, `EndAt`, `Status`) VALUES (NULL, ?, ?, ?, ?, ?, ?, 'Pending')", [orderRequest.CustomerID, orderRequest.GigID, orderRequest.JobDescription, orderRequest.TotalEstimation, dateStart, dateEnd], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};



OrderRequest.getOrderRequestWithPagingAndFilter = function (userId,userRole,status,limit, offset, orderRequest, pagination) {
 
  var sqlForCustomer ="SELECT r.*, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM `OrderRequest` r INNER JOIN Customer c ON r.CustomerID = c.CustomerID INNER JOIN Gig g ON g.GigID = r.GigID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE r.CustomerID = "+userId+" AND r.Status LIKE ? ORDER BY r.OrderRequestID ASC LIMIT ? OFFSET ?";
  var sqlForFreelancer = "SELECT r.*, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM `OrderRequest` r INNER JOIN Customer c ON r.CustomerID = c.CustomerID INNER JOIN Gig g ON g.GigID = r.GigID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE g.FreelancerID = "+userId+" AND r.Status LIKE ? ORDER BY r.OrderRequestID ASC LIMIT ? OFFSET ?";
  var sql;
  var sqlCountForCustomer="SELECT COUNT(*) AS count FROM `OrderRequest` r INNER JOIN Customer c ON r.CustomerID = c.CustomerID WHERE r.CustomerID = "+userId+" AND r.Status LIKE ?";
  var sqlCountForFreelancer="SELECT COUNT(*) AS count FROM `OrderRequest` r INNER JOIN Customer c ON r.CustomerID = c.CustomerID INNER JOIN Gig g ON g.GigID = r.GigID WHERE g.FreelancerID = "+userId+" AND r.Status LIKE ?";
  var sqlCount;
  if(userRole=='C'){
    console.log("🚀 ~ file: Order.js ~ userRole: Customer",);
    
    sql = sqlForCustomer;
    sqlCount = sqlCountForCustomer;
  }else{
    console.log("🚀 ~ file: Order.js ~ userRole: Freelancer",);

    sql = sqlForFreelancer;
    sqlCount = sqlCountForFreelancer;

  }
  console.log(sql);
 var data = connectDb.query(sql, ['%'+status+'%', limit, offset], function (err, res) {
    if (err) {
      orderRequest(err, null);
    }
    else {
      orderRequest(null, res);
    }
  });
  connectDb.query(sqlCount, ['%'+status+'%'], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });
};

OrderRequest.changeOrderRequestStatus = function (status,OrderRequestID, result) {
  connectDb.query("UPDATE `OrderRequest` SET `Status` = ? WHERE `OrderRequest`.`OrderRequestID` = ?", [status,OrderRequestID], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};

OrderRequest.updateOrderRequestNote = function (Note,OrderRequestID, result) {
    connectDb.query("UPDATE `OrderRequest` SET `Note` = ? WHERE `OrderRequest`.`OrderRequestID` = ?", [Note,OrderRequestID], function (err, res) {
      if (err) {
  
        result(err,null);
      }
      else {
  
        result(null,res);
      }
    });
  };

  OrderRequest.updateOrderRequestJobDescription = function (JobDescription,OrderRequestID, result) {
    connectDb.query("UPDATE `OrderRequest` SET `JobDescription` = ? WHERE `OrderRequest`.`OrderRequestID` = ?", [JobDescription,OrderRequestID], function (err, res) {
      if (err) {
  
        result(err,null);
      }
      else {
  
        result(null,res);
      }
    });
  };
  OrderRequest.chartgig = function(FreelancerID,result){
  var sqlGetTitleGigChart="SELECT g.Title,COUNT(*) AS NUMBERGIG FROM OrderRequest od INNER JOIN `Order` o on od.OrderRequestID= o.OrderRequestID INNER JOIN Gig g on od.GigID = g.GigID where g.FreelancerID= ? group by g.Title "
  connectDb.query(sqlGetTitleGigChart, [ FreelancerID ], function (err, res) {
    if (err) {
  
      result(err,null);
    }
    else {

      result(null,res);
    }
  });
  }
  OrderRequest.getOrderRequestById = function (id, result) {
    connectDb.query("SELECT ro.OrderRequestID, ro.Status, ro.Note, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, g.Title, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM OrderRequest ro INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE OrderRequestID = ?", [id], function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };


module.exports = OrderRequest;