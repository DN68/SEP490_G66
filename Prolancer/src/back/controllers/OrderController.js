const Order = require('../models/Order');
const OrderRequest = require('../models/OrderRequest');

class OrderController {

  createOrder = function (req, res) {
    const data = req.body;
    var order = (data.order)

    Order.createOrder(order, function (result) {

        if (result){

        return res.send({message:'Create Order Success', insertId: result.insertId});}
      else {
        return res.send('Create Order Fail');

      }


    })

  }

  getOrderById = function (req, res) {
    var id = req.params.id;

    console.log('Id '+id)

    Order.getOrderById(id, function (err, order) {
      if (err)
        res.send(err);
      console.log('res', order);
      res.send(order);
    });

  };


  getOrderWithPagingAndSearching = function (req, res) {
    const limit = 6;
    var pageQuery = req.query;
    var page;
    var search = '';
    var status = 'Active';
    var userId = '';
    var userRole = '';
    console.log(pageQuery);
    if (pageQuery.page != null) {
      page = pageQuery.page;
    } else {
      page = 1;
    }
    if (pageQuery.search != '') {
      console.log('search here');

      search = pageQuery.search;
    }
    status = pageQuery.status;
    userId = pageQuery.user.userId;
    userRole = pageQuery.user.role;
    console.log(status, page, userId, userRole);

    const offset = (page - 1) * limit;
    let order, totalRows;
    const fetchData = new Promise((resolve, reject) => {
      Order.getOrderWithPagingAndSearching(userId, userRole, status, search, limit, offset, function (err, orderData) {
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
          totalPage: Math.ceil(totalRows[0].count / 6),
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
        res.send({ message: 'Change Status Success' });
      }

    });

  };

  updateOrderRequirement = function (req, res) {
    const data = req.body;
    var orderID = data.orderID;

    var newRequirement = data.newRequirement;

    Order.updateOrderRequirement(newRequirement, orderID, function (err, result) {
      if (err)
        res.send(err);
      else {
        console.log('res', result);

        res.send({ message: 'Add Requirement Success' });
      }

    })
  }

  createOrderRequest = function (req, res) {
    const data = req.body;
    var orderRequest = (data.orderRequest);
    console.log(orderRequest);
    if (orderRequest.requestType == "Cancel")
      orderRequest.Request_Action = orderRequest.requestType;
    else {
      orderRequest.Request_Action = orderRequest.ExtendDay;

    }
    console.log(orderRequest);
    OrderRequest.createOrderRequest(orderRequest, function (err, result) {
      if (err)
         res.send(err);
      else {
         res.send({ message: 'Send Request Success' });
      }

    })

  }


  getOrderRequestWithPagingAndFilter = function (req, res) { 
    const limit = 6;
    var pageQuery = req.query;
    var page;
    var requestType = 'Cancel';
    var userId = '';
    var userRole = '';
    var status='';
    console.log(pageQuery);
    if (pageQuery.page != null) {
      page = pageQuery.page;
    } else {
      page = 1;
    }
    if(pageQuery.status!=undefined){
      status = pageQuery.status
      console.log("🚀 ~ file: OrderController.js:186 ~ OrderController ~ status:", status)
    }
    requestType = pageQuery.requestType;
    userId = pageQuery.user.userId;
    userRole = pageQuery.user.role;
    console.log(requestType, page, userId, userRole);

    const offset = (page - 1) * limit;
    let orderRequest, totalRows;
    const fetchData = new Promise((resolve, reject) => {
      OrderRequest.getOrderRequestWithPagingAndFilter(userId,userRole,requestType,status, limit, offset, function (err, orderRequestData) {
        if (err) {

          reject(err);
        } else {
          orderRequest = orderRequestData;
          if (totalRows !== undefined) {
            resolve();
          }
        }
      }, function (err, totalRowsData) {
        if (err) {
          reject(err);
        } else {
          totalRows = totalRowsData;
          if (orderRequest !== undefined) {
            resolve();
          }
        }
      });
    });

    fetchData.then(() => {
      // Both callbacks have been called, so you can send the response now.
      res.send({
        orderRequest, pagination: {
          totalPage: Math.ceil(totalRows[0].count / 6),
          page: parseInt(page),
          totalRow: totalRows[0].count
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

  changeOrderRequestStatus = function (req, res) {
    const data = req.body;
    var status = data.status;
    var orderRequestID = data.orderRequestID;

    console.log(status + orderRequestID);

    OrderRequest.changeOrderRequestStatus(status, orderRequestID, function (err, result) {
      if (err)
        return res.send(err);
      else {
        console.log('res', result);
        res.send({ message: 'Change Order Request Status Success' });
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

        res.send({ message: 'Update Extend Day Success' });
      }

    })
  }

}
module.exports = new OrderController;   