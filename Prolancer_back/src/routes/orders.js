const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/deliverOrder',
            OrderController.deliverOrder

);
router.put('/updateOrderExtendDay',
            OrderController.updateOrderExtendDay

);

router.get('/getOrderRequest',
            OrderController.getOrderRequestWithPagingAndFilter

);
router.post('/createOrder',
            OrderController.createOrder

);

router.post('/createOrderRequest',
            OrderController.createOrderRequest

);

router.get('/index',
            OrderController.getOrderWithPagingAndSearching

);
router.put('/updateStatus',
            OrderController.changeOrderStatus

);
router.put('/updateRequirement',
            OrderController.updateOrderRequirement

);
router.get('/details/:id',
OrderController.getOrderById


);
module.exports = router;