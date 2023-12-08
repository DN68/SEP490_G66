const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');



router.put('/addOrderEffort',
            OrderController.addOrderEffort
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
router.get('/getchartearning',
    OrderController.chartearning

);
module.exports = router;