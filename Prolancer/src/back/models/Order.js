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
    console.log("🚀 ~ file: OrderController.js:9 ~ OrderController ~ order:", order)
    const date = require('moment')(order.orderDate).format('YYYY-MM-DD HH:mm:ss');
    
    connectDb.query("INSERT INTO `Order` (`OrderID`, `CustomerID`, `FreelancerID`, `GigID`, `Order_Date`, `Total_Amount`, `Status`, `Description`) VALUES (NULL, ?, ?, ?, ?, ?, 'Active', ?)", [order.orderCustomerID, order.orderFreelancerID, order.orderGigID, date, order.orderAmout, order.orderDescription], function (err, res) {
          if(err) {
            console.log("🚀 ~ file: Order.js:22 ~ err:", err)

            result(err);
          }
          else{
            console.log("🚀 ~ file: Order.js:26 ~ es);:", res);

            result(res);
          }
      });
  };

  module.exports= Order;