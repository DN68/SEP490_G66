const express = require('express');
const router = express.Router();
const OrderRequestController = require('../controllers/OrderRequestController');

router.get('/details/:id',
OrderRequestController.getOrderRequestById

);
router.put('/updateOrderRequestJobDescription', 
OrderRequestController.updateOrderRequestJobDescription

);
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
router.get('/getGigTitle', 
OrderRequestController.chartgig

);

module.exports = router;