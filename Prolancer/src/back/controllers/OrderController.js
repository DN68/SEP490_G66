const Order = require('../models/Order');
class OrderController {

  createOrder = function (req, res) {
    const data = req.body;
    var order = (data.order)

    Order.createOrder(order, function (result) {
      if (result)
        return res.send('Create Order Success');
      else {
        return res.send('Create Order Fail');

      }


    })

  }
}
module.exports = new OrderController;   