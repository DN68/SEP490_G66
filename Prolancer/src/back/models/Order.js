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

Order.getOrderWithPagingAndSearching = function (userId,status,search,limit, offset, order, pagination) {

  connectDb.query("SELECT Order.OrderID,Order.CustomerID,Order.FreelancerID,Order.GigID,Order.Order_Date,Order.Total_Amount,Order.Description as OrderDescription, Order.Status as OrderStatus, Gig.Title, Gig.Gig_IMG,Gig.Delivery_Day, Gig.Price, User.First_Name as CustomerFirstName, User.Last_Name as CustomerLastName, User.Profile_Picture FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID INNER JOIN User ON Order.FreelancerID = User.UserID WHERE Order.CustomerID = ? AND Order.Status = ? AND Gig.Title LIKE ? ORDER BY Order.OrderID ASC LIMIT ? OFFSET ?", [ userId,status,'%'+search+'%', limit, offset], function (err, res) {
    if (err) {
      order(err, null);
    }
    else {
      order(null, res);
    }
  });
  connectDb.query("Select COUNT(*) AS count FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID INNER JOIN User ON Order.CustomerID = User.UserID WHERE Order.CustomerID = ? AND Order.Status = ? AND Gig.Title LIKE ? ", [userId,status,'%'+search+'%'], function (err, res) {
    if (err) {

      pagination(err,null);
    }
    else {
      pagination(null,res);
    }
  });
};
module.exports = Order;