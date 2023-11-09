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
  
  connectDb.query("INSERT INTO `Order` (`OrderID`, `CustomerID`, `FreelancerID`, `GigID`, `Order_Date`, `Total_Amount`, `Status`, `Description`) VALUES (NULL, ?, ?, ?, ?, ?, 'Active', ?)", [order.orderCustomerID, order.orderFreelancerID, order.orderGigID, date, order.orderAmout, order.orderDescription], function (err, res) {
    if (err) {

      result(err);
    }
    else {

      result(res);
    }
  });
};

Order.getOrderById = function (id, result) {
  connectDb.query("SELECT Order.OrderID,Order.CustomerID,Order.FreelancerID,Order.GigID,Order.Order_Date,Order.Total_Amount,Order.Description as OrderDescription, Order.Status as OrderStatus, Gig.Title, Gig.Gig_IMG,Gig.Delivery_Day, Gig.Price, User.First_Name as CustomerFirstName, User.Last_Name as CustomerLastName FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID INNER JOIN User ON Order.CustomerID = User.UserID WHERE OrderID = ?", [id], function (err, res) {
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
  var sqlForAdmin = "SELECT o.*, g.Title, g.Gig_IMG,g.Delivery_Day, g.Price, user1.First_Name as CustomerFirstName, user1.Last_Name as CustomerLastName, user1.Profile_Picture as CustomerProfilePicture, user2.First_Name as FreelancerFirstName, user2.Last_Name as FreelancerLastName, user2.Profile_Picture as FreelancerProfilePicture FROM `Order` o INNER JOIN Gig g ON o.GigID = g.GigID  INNER JOIN User user1 on o.CustomerID = user1.UserID INNER JOIN User user2 on o.FreelancerID = user2.UserID WHERE o.Status = ? AND g.Title LIKE ? ORDER BY o.OrderID ASC LIMIT ? OFFSET ?";
  var sql;
  var sqlCountForCustomer="Select COUNT(*) AS count FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID  WHERE Order.CustomerID = "+userId+" AND Order.Status = ? AND Gig.Title LIKE ? ";
  var sqlCountForFreelancer="Select COUNT(*) AS count FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID  WHERE Order.FreelancerID = "+userId+" AND Order.Status = ? AND Gig.Title LIKE ? ";
  var sqlCountForAdmin="Select COUNT(*) AS count FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID  WHERE Order.Status = ? AND Gig.Title LIKE ? ";
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
 var data = connectDb.query(sql, [status,'%'+search+'%', limit, offset], function (err, res) {
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
 const check= connectDb.query("UPDATE `Order` SET `Extend_Day` = ? WHERE `Order`.`OrderID` = ?", [extendDay,orderID], function (err, res) {
    if (err) {

      result(err,null);
    }
    else {

      result(null,res);
    }
  });

  console.log(check);
};
module.exports = Order;