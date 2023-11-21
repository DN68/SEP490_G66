const express = require('express');
const router = express.Router();
const OrderRequestController = require('../controllers/OrderRequestController');

router.put('/updateOrderRequestNote', 
OrderRequestController.updateOrderRequestNote

);
router.put('/changeOrderRequestStatus', 
OrderRequestController.changeOrderRequestStatus

);
router.get('/getOrderRequest', 
OrderRequestController.getOrderRequestWithPagingAndFilter

);
router.post('/createOrderRequest', 
OrderRequestController.createOrderRequest

);


module.exports = router;