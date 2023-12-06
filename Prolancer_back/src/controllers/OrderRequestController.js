const OrderRequest = require('../models/OrderRequest');
class OrderRequestController {
    createOrderRequest = function (req, res) {
        const data = req.body;
        var orderRequest = (data.orderRequest);    

        if (orderRequest){
            OrderRequest.createOrderRequest(orderRequest, function (err, result) {
                console.log(result);

                if (err)
                    res.status(500).send({message: 'Send Request Failed' + err});
                else {
                    res.send({ message: 'Send Request Success' });
                }

            })
        }
        else {
            res.send({ message: 'Invalid or missing data' });

        }
    }

    getOrderRequestWithPagingAndFilter = function (req, res) {
        const limit = 6;
        var pageQuery = req.query;
        var page;
        var userId = '';
        var userRole = '';
        var status = '';
        var user = '';
        console.log(pageQuery);
        if (pageQuery.page != null) {
          page = pageQuery.page;
        } else {
          page = 1;
        }
        if (pageQuery.status != undefined) {
          status = pageQuery.status
          console.log("🚀 ~ file: OrderController.js:186 ~ OrderController ~ status:", status)
        }
        user = pageQuery.user;
        if (!status||!user) {
          return res.status(400).send('Invalid or missing data');
        }
        userRole = user.Role;
        if (userRole == 'C') {
            userId = user.CustomerID;

        }else{
            userId = user.FreelancerID;
        }
        console.log( page, userId, userRole);
    
        const offset = (page - 1) * limit;
        let orderRequest, totalRows;
        const fetchData = new Promise((resolve, reject) => {
          OrderRequest.getOrderRequestWithPagingAndFilter(userId, userRole, status, limit, offset, function (err, orderRequestData) {
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
              totalPage: Math.ceil(totalRows[0].count / limit),
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
            if (result.affectedRows == 0) {
                return res.send({ message: 'Change Order Request Status Failed' });
    
            }
            res.send({ message: 'Change Order Request Status Success' });
          }
    
        });
    
      };

      updateOrderRequestNote = function (req, res) {
        const data = req.body;
        var OrderRequestID = data.OrderRequestID;
        var Note = data.Note;
        if (!OrderRequestID||!Note) {
          return res.status(400).send('Invalid or missing data');
        }
        OrderRequest.updateOrderRequestNote(Note, OrderRequestID, function (err, result) {
          if (err)
            res.status(500).send(err);
          else {
            console.log('res', result);
            if (result.affectedRows == 0) {
              res.send({ message: 'Add Note Failed' });
    
            }
            res.send({ message: 'Add Note Success' });
          }
    
        })
      }


      updateOrderRequestJobDescription = function (req, res) {
        const data = req.body;
        var OrderRequestID = data.OrderRequestID;
    
        var newJobDescription = data.newJobDescription;
    
        OrderRequest.updateOrderRequestJobDescription(newJobDescription, OrderRequestID, function (err, result) {
          if (err)
            res.send(err);
          else {
            console.log('res', result);
            if (result.affectedRows == 0) {
              res.send({ message: 'Add New JobDescription Failed' });
    
            }
            res.send({ message: 'Add New JobDescription Success' });
          }
    
        })
      }


      chartgig = function (req, res) {  
        const data = req.query;
        var FreelancerID = data.FreelancerID;
        console.log(FreelancerID)

        OrderRequest.chartgig(FreelancerID, function (err, result) {
          if (err)
            return res.send(err);
          else {
            
            return res.send(result);
          }
        });
        }
    
      getOrderRequestById = function (req, res) {
        var id = req.params.id;
    
        if (!id) {
          return res.status(400).send('Invalid or missing data');
        }
        OrderRequest.getOrderRequestById(id, function (err, orderRequest) {
          if (err)
            res.status(500).send(err);
          else {
            res.send(orderRequest.length > 0 ? orderRequest : 'Order request not exist');
    
          }
        });
    
      };
      
}

module.exports = new OrderRequestController;