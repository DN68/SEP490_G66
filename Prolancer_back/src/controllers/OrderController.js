const Order = require('../models/Order');
const OrderRequest = require('../models/ChangeRequest');

const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
class OrderController {

  createOrder = function (req, res) {
    const data = req.body;
    var order = (data.order)
    if (!order) {
      return res.status(400).send('Invalid or missing data');
    }

    Order.createOrder(order, function (err, result) {

      if (result) {
        return res.send({ message: 'Create Order Success', insertId: result.insertId });
      }
      else {
        return res.status(500).send('Create Order Failed' + err);
      }
    })
  }

  getOrderById = function (req, res) {
    var id = req.params.id;


    Order.getOrderById(id, function (err, order) {
      if (err)
        res.send(err);
      else {
        res.send(order.length > 0 ? order : 'Order not exist');

      }
    });

  };


  getOrderWithPagingAndSearching = function (req, res) {
    const limit = 6;
    var pageQuery = req.query;
    var page;
    var search = '';
    var status = '';
    var userId = '';
    var user = '';
    console.log(pageQuery);
    if (pageQuery.page != null) {
      page = pageQuery.page;
    } else {
      page = 1;
    }
    if (pageQuery.search != undefined ) {
      console.log('search here');

      search = pageQuery.search;
    }
    status = pageQuery.status;
    user = pageQuery.user;
    if (!status||!user) {
      return res.status(400).send('Invalid or missing data');
    }
    if (user.Role == 'C') {
      userId = user.CustomerID;
    } else if(user.Role == 'F'){
      userId = user.FreelancerID;
    }
    console.log('67', status, page, userId, user.Role, search);
    const offset = (page - 1) * limit;
    let order, totalRows;
    const fetchData = new Promise((resolve, reject) => {
      Order.getOrderWithPagingAndSearching(userId, user.Role, status, search, limit, offset, function (err, orderData) {
        if (err) {

          reject(err);
        } else {
          order = orderData;
          if (totalRows !== undefined) {
            resolve();
          }
        }
      }, function (err, totalRowsData) {
        if (err) {
          reject(err);
        } else {
          totalRows = totalRowsData;
          if (order !== undefined) {
            resolve();
          }
        }
      });
    });

    fetchData.then(() => {
      // Both callbacks have been called, so you can send the response now.
      res.send({
        order, pagination: {
          totalPage: Math.ceil(totalRows[0].count / limit),
          page: parseInt(page),
          totalRow: totalRows[0].count
        }, searchQuery: {
          search: search

        }
      });
    },
      (err) => {
        res.send(err);
      }).catch(error => {
        console.error(error);
        res.status(500).send("An error occurred");
      });
  }

  changeOrderStatus = function (req, res) {
    const data = req.body;
    var status = data.status;
    var orderID = data.orderID;

    console.log(status + orderID);

    Order.changeOrderStatus(status, orderID, function (err, result) {
      if (err)
        return res.send(err);
      else {
        console.log('res', result);
        if (result.affectedRows == 0) {
          res.send({ message: 'Change Status Failed' });

        }
        res.send({ message: 'Change Status Success' });
      }

    });

  };


  updateOrderExtendDay = function (req, res) {
    const data = req.body;
    var orderID = data.orderID;

    var extendDay = parseInt(data.extendDay);

    Order.updateOrderExtendDay(extendDay, orderID, function (err, result) {
      if (err)
        res.send(err);
      else {
        if (result.affectedRows == 0) {
          res.send({ message: 'Update Extend Day Failed' });

        }
        res.send({ message: 'Update Extend Day Success' });
      }

    })
  }

  addOrderEffort = function (req, res) {
    const data = req.body;
    var orderID = data.orderID;
    var addEffort = parseInt(data.addEffort);
    if (!orderID||!addEffort) {
      return res.status(400).send('Invalid or missing data');
    }

    Order.addOrderEffort(addEffort, orderID, function (err, result) {
      if (err)
        res.status(500).send(err);
      else {
        if (result.affectedRows == 0) {
          res.send({ message: 'Add Order Effort Failed' });

        }
        res.send({ message: 'Add Order Effort Success' });
      }

    })
  }
  chartearning = function (req, res) {  
    const data = req.query;
    var FreelancerID = data.FreelancerID;
    console.log(FreelancerID)

    Order.chartearning(FreelancerID, function (err, result) {
      if (err)
        return res.send(err);
      else {
        
        return res.send(result);
      }
    });
    }
}
module.exports = new OrderController;   