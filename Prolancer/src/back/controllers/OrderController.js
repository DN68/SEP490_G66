const Order = require('../models/Order');
class OrderController {

  createOrder = function (req, res) {
    const data = req.body;
    var order = (data.order)
    console.log('Here')
    Order.createOrder(order, function (result) {

      if (result) {

        return res.send({ message: 'Create Order Success', insertId: result.insertId });
      }
      else {
        return res.send('Create Order Fail');

      }


    })

  }

  getOrderById = function (req, res) {
    var id = req.params.id;

    console.log('Id ' + id)

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
    var search ='';
    var status ='Active';
    var userId= '';
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
    userId = pageQuery.userID;
    console.log(status, page , userId);
 
    const offset = (page - 1) * limit;
    let order, totalRows;
    const fetchData = new Promise((resolve, reject) => {
      Order.getOrderWithPagingAndSearching(userId,status,search, limit, offset, function (err, orderData) {
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
}
module.exports = new OrderController;   