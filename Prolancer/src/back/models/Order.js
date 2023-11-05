const connectDb = require('../common/connectdb.js');

var Order = function(order){
    this.OrderID     = order.OrderID;
    this.CustomerID      = order.CustomerID;
    this.FreelancerID          = order.FreelancerID;
    this.GigID          = order.GigID;
    this.Order_Date   = order.Order_Date;
    this.Total_Amount    = order.Total_Amount;
    this.Status = order.Status;
    this.Description     = order.Description;
    
  };

  Order.createOrder = function (order,result) {
    const date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    
    connectDb.query("INSERT INTO `Order` (`OrderID`, `CustomerID`, `FreelancerID`, `GigID`, `Order_Date`, `Total_Amount`, `Status`, `Description`) VALUES (NULL, ?, ?, ?, ?, ?, 'Active', ?)", [order.orderCustomerID, order.orderFreelancerID, order.orderGigID, date, order.orderAmout, order.orderDescription], function (err, res) {
          if(err) {

            result(err);
          }
          else{

            result(res);
          }
      });
  };

  Order.getOrderById = function (id,result) {
    
  const a=  connectDb.query("SELECT *,Order.Description as OrderDescription, Order.Status as OrderStatus FROM `Order` INNER JOIN Gig ON Order.GigID = Gig.GigID WHERE OrderID = ?", [id], function (err, res) {
          if(err) {
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
      console.log(a);
  };

  module.exports= Order;