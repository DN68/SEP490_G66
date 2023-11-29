const Order = require('../models/Order');
const OrderRequest = require('../models/ChangeRequest');

const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
class OrderController {

  createOrder = function (req, res) {
    const data = req.body;
    var order = (data.order)

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
    var status = 'Active';
    var userId = '';
    var userRole = '';
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
    userRole = pageQuery.user.Role;
    if (userRole == 'C') {
      userId = pageQuery.user.CustomerID;
    } else if(userRole == 'F'){
      userId = pageQuery.user.FreelancerID;
    }
    console.log('67', status, page, userId, userRole, search);
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

  deliverOrder = function (req, res) {
    let deliverFile;
    var orderID = req.body.orderID;


    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    deliverFile = req.files.file;
    console.log("🚀 ~ file: OrderController.js:280 ~ OrderController ~ sampleFile:", deliverFile)


    // const uploadPath = '../Prolancer/public/delivery' + deliverFile.name;
    const newFileName = `${orderID}_${deliverFile.name}`;
    const commonPath = path.join('uploads', 'delivery', newFileName);

    console.log("🚀 ~ file: OrderController.js:284 ~ OrderController ~ uploadPath:", commonPath)
    const uploadPath = path.join(__dirname, '..', '..', commonPath);
    console.log("🚀 ~ file: OrderController.js:289 ~ OrderController ~ uploadPath:", uploadPath)
    if (fs.existsSync(uploadPath)) {
      // Delete the existing file
      console.log("Run Here")
      fsp.unlink(uploadPath)
        .then(() => {
          console.log('Existing file deleted successfully');
          continueWithFileUpload();
        })
        .catch((unlinkError) => {
          console.error('Error deleting existing file:', unlinkError);
          return res.status(500).json({ error: 'Error deleting existing file.' });
        });
    } else {
      continueWithFileUpload();

    }

    function continueWithFileUpload() {
      deliverFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        const filePath = commonPath.replace(/\\/g, '/');
        console.log("🚀 ~ file: OrderController.js:318 ~ OrderController ~ deliverFile.mv ~ filePath:", filePath);

        Order.deliverOrder(filePath, orderID, function (err, result) {
          if (err)
            return res.status(500).send(err);
          else {
            console.log("File uploaded successfully Run Here")
            if (result.affectedRows == 0) {
              return res.send({ message: 'File uploaded Failed' });

            }
            res.json({ message: 'File uploaded successfully' });

          }

        })
      });
    }
  }
}
module.exports = new OrderController;   