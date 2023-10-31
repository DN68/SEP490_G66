const Order = require('../models/Order');
class OrderController {

    createOrder = function (req,res){
        const data = req.body;
        console.log( 'data :'+data);
          res.send('New Detail');
        var order =(data.order) 
        
        Order.createOrder(order,function(result){
          // if (err)
          // res.send(err);
          // res.redirect('/gigs/index');
          // res.send('Here');
        console.log( 'data : Good');
       

          })
         res.redirect('http://localhost:8080/');

}
}
module.exports = new OrderController;   