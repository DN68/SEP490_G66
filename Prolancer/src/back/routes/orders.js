const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/index',
            OrderController.createOrder

);
router.get('/index',
            OrderController.getOrderWithPagingAndSearching

);

router.get('/details/:id',
OrderController.getOrderById


);
module.exports = router;