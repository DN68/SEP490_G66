const connectDb = require('../common/connectdb.js');

var Order = function (order) {
  this.OrderID = order.OrderID;
  this.CustomerID = order.CustomerID;
  this.FreelancerID = order.FreelancerID;
  this.GigID = order.GigID;
  this.Order_Date = order.Order_Date;
  this.Total_Amount = order.Total_Amount;
  this.Status = order.Status;
  this.Description = order.Description;

};

Order.createOrder = function (order, result) {
  const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
  
  connectDb.query("INSERT INTO `Order` (`OrderID`, `OrderRequestID`, `Order_Date`, `Status`, `Description`) VALUES (NULL,?, ?, 'Active', '')", [order.OrderRequestID, date], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};

Order.getOrderById = function (id, result) {
  connectDb.query("SELECT o.*, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, g.Title, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE OrderID = ?", [id], function (err, res) {
    if (err) {
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Order.getOrderWithPagingAndSearching = function (userId,userRole,status,search,limit, offset, order, pagination) {
  var sqlForCustomer ="SELECT o.*, g.Title, g.Gig_IMG,g.Delivery_Day, g.Price, user1.First_Name as CustomerFirstName, user1.Last_Name as CustomerLastName, user1.Profile_Picture as CustomerProfilePicture, user2.First_Name as FreelancerFirstName, user2.Last_Name as FreelancerLastName, user2.Profile_Picture as FreelancerProfilePicture FROM `Order` o INNER JOIN Gig g ON o.GigID = g.GigID  INNER JOIN User user1 on o.CustomerID = user1.UserID INNER JOIN User user2 on o.FreelancerID = user2.UserID WHERE o.CustomerID = "+userId+" AND o.Status = ? AND g.Title LIKE ? ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sqlForFreelancer ="SELECT o.*, g.Title, g.Gig_IMG,g.Delivery_Day, g.Price, user1.First_Name as CustomerFirstName, user1.Last_Name as CustomerLastName, user1.Profile_Picture as CustomerProfilePicture, user2.First_Name as FreelancerFirstName, user2.Last_Name as FreelancerLastName, user2.Profile_Picture as FreelancerProfilePicture FROM `Order` o INNER JOIN Gig g ON o.GigID = g.GigID  INNER JOIN User user1 on o.CustomerID = user1.UserID INNER JOIN User user2 on o.FreelancerID = user2.UserID WHERE o.FreelancerID = "+userId+" AND o.Status = ? AND g.Title LIKE ? ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sqlForAdmin = "SELECT o.*, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE o.Status = ? ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sql;
  var sqlCountForCustomer="Select COUNT(*) AS count FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID  WHERE Order.CustomerID = "+userId+" AND Order.Status = ? AND Gig.Title LIKE ? ";
  var sqlCountForFreelancer="Select COUNT(*) AS count FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID  WHERE Order.FreelancerID = "+userId+" AND Order.Status = ? AND Gig.Title LIKE ? ";
  var sqlCountForAdmin="SELECT COUNT(*) AS count FROM `Order` WHERE Order.Status = ? ";
  var sqlCount;
  if(userRole=='C'){
    console.log("🚀 ~ file: Order.js ~ userRole: Customer",);
    
    sql = sqlForCustomer;
    sqlCount = sqlCountForCustomer;
  }else if(userRole=='F'){
    console.log("🚀 ~ file: Order.js ~ userRole: Freelancer",);

    sql = sqlForFreelancer;
    sqlCount = sqlCountForFreelancer;

  }else{
    console.log("🚀 ~ file: Order.js ~ userRole: Admin",);

    sql = sqlForAdmin;
    sqlCount = sqlCountForAdmin;

  }
  console.log(sql);
 var data = connectDb.query(sql, [status, limit, offset], function (err, res) {
    if (err) {
      order(err, null);
    }
    else {
      order(null, res);
    }
  });
  connectDb.query(sqlCount, [status,'%'+search+'%'], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });
};

Order.changeOrderStatus = function (status,orderID, result) {
  connectDb.query("UPDATE `Order` SET `Status` = ? WHERE `Order`.`OrderID` = ?", [status,orderID], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });
};

Order.updateOrderExtendDay = function (extendDay,orderID, result) {
 connectDb.query("UPDATE `Order` SET `Extend_Day` = `Extend_Day` + ? WHERE `Order`.`OrderID` = ?", [extendDay,orderID], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });

};

Order.deliverOrder = function (deliverFile,orderID, result) {
   connectDb.query("UPDATE `Order` SET `Delivery` = ? WHERE `Order`.`OrderID` = ?", [deliverFile,orderID], function (err, res) {
    if (err) {
 
       result(err,null);
     }
     else {
 
       result(null,res);
     }
   });
 
 };
module.exports = Order;