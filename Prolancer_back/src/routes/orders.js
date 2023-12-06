const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.put('/addOrderEfford',
    OrderController.addOrderEfford

);
router.post('/deliverOrder',
    OrderController.deliverOrder

);
router.put('/updateOrderExtendDay',
    OrderController.updateOrderExtendDay

);
router.post('/createOrder',
    OrderController.createOrder

);
router.get('/index',
    OrderController.getOrderWithPagingAndSearching

);
router.put('/updateStatus',
    OrderController.changeOrderStatus

);
router.get('/details/:id',
    OrderController.getOrderById
);

module.exports = router;