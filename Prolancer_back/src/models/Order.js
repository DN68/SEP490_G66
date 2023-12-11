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

      result(err, null);
    }
    else {

      result(null, res);
    }
  });
};

Order.getOrderById = function (id, result) {
  connectDb.query("SELECT o.*, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, g.Title, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, c.CustomerID, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, f.FreelancerID, c.CompanyName FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE OrderID = ?", [id], function (err, res) {
    if (err) {
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Order.getOrderWithPagingAndSearching = function (userId, userRole, status, search, limit, offset, order, pagination) {
  var sqlForCustomer = "SELECT o.*, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE o.Status = ? AND ro.CustomerID = " + userId + " ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sqlForFreelancer = "SELECT o.*, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE o.Status = ? AND g.FreelancerID = " + userId + " ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sqlForAdmin = "SELECT o.*, ro.JobDescription, ro.TotalEstimation, ro.StartFrom, ro.EndAt, g.Price, g.Gig_IMG, c.First_Name AS CustomerFirstName, c.Last_Name AS CustomerLastName, c.Profile_Picture AS CustomerProfilePicture, f.First_Name AS FreelancerFirstName, f.Last_Name AS FreelancerLastName, f.Profile_Picture AS FreelancerProfilePicture, c.CompanyName FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE o.Status = ? ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sql;
  var sqlCountForCustomer = "SELECT COUNT(*) AS count FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE o.Status = ? AND ro.CustomerID = " + userId;
  var sqlCountForFreelancer = "SELECT COUNT(*) AS count FROM `Order` o INNER JOIN OrderRequest ro ON ro.OrderRequestID = o.OrderRequestID INNER JOIN Gig g ON g.GigID = ro.GigID INNER JOIN Customer c ON c.CustomerID = ro.CustomerID INNER JOIN Freelancer f ON f.FreelancerID = g.FreelancerID WHERE o.Status = ? AND g.FreelancerID = " + userId;
  var sqlCountForAdmin = "SELECT COUNT(*) AS count FROM `Order` WHERE Order.Status = ? ";
  var sqlCount;
  if (userRole == 'C') {
    console.log("🚀 ~ file: Order.js ~ userRole: Customer",);

    sql = sqlForCustomer;
    sqlCount = sqlCountForCustomer;
  } else if (userRole == 'F') {
    console.log("🚀 ~ file: Order.js ~ userRole: Freelancer",);

    sql = sqlForFreelancer;
    sqlCount = sqlCountForFreelancer;

  } else {
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
  connectDb.query(sqlCount, [status], function (err, res) {
    if (err) {

      pagination(err, null);
    }
    else {
      pagination(null, res);
    }
  });
};

Order.changeOrderStatus = function (status, orderID, result) {
  connectDb.query("UPDATE `Order` SET `Status` = ? WHERE `Order`.`OrderID` = ?", [status, orderID], function (err, res) {
    if (err) {

      result(err, null);
    }
    else {

      result(null, res);
    }
  });
};

Order.updateOrderExtendDay = function (extendDay, orderID, result) {
  connectDb.query("UPDATE `Order` SET `Extend_Day` = `Extend_Day` + ? WHERE `Order`.`OrderID` = ?", [extendDay, orderID], function (err, res) {
    if (err) {

      result(err, null);
    }
    else {

      result(null, res);
    }
  });

};

Order.deliverOrder = function (deliverFile, orderID, result) {
  connectDb.query("UPDATE `Order` SET `Delivery` = ? WHERE `Order`.`OrderID` = ?", [deliverFile, orderID], function (err, res) {
    if (err) {

      result(err, null);
    }
    else {

      result(null, res);
    }
  });

};

Order.addOrderEffort = function (addEffort, orderID, result) {
  connectDb.query("UPDATE `Order` SET `AddEffort` = ? WHERE `Order`.`OrderID` = ?", [addEffort, orderID], function (err, res) {
    if (err) {

      result(err, null);
    }
    else {

      result(null, res);
    }
  });

};

Order.changeOrderToCompleted = function (result) {
  connectDb.query("UPDATE `Order` SET `Status` = 'Completed' WHERE `Order`.`OrderID` IN ( SELECT * FROM ( SELECT o.OrderID FROM `Order` o INNER JOIN Delivery d ON o.OrderID = d.OrderID GROUP BY o.OrderID HAVING COUNT(d.DeliveryID) = COUNT(CASE WHEN d.Status = 'Accept' THEN 1 END) ) AS OrderHasCompleted )", function (err, res) {
    if (err) {

      result(err, null);
    }
    else {

      result(null, res);
    }
  });

};
Order.chartearning = function (FreelancerID, result) {
  var sqlGetTitleGigChart = "SELECT MONTH(o.Order_Date) AS MONTH, (SUM(g.Price*(od.TotalEstimation+o.AddEffort))) AS Price FROM OrderRequest od INNER JOIN `Order` o on od.OrderRequestID = o.OrderRequestID INNER JOIN Gig g on od.GigID = g.GigID INNER JOIN Freelancer f on f.FreelancerID = g.FreelancerID where g.FreelancerID = ? AND o.Status ='Completed'  GROUP BY MONTH(o.Order_Date)"
  connectDb.query(sqlGetTitleGigChart, [FreelancerID], function (err, res) {
    if (err) {

      result(err, null);
    }
    else {

      result(null, res);
    }
  });
}

module.exports = Order;