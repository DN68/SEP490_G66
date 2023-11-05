const Order = require('../models/Order');
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
}
module.exports = new OrderController;   