const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');


router.get('/info', 
    customerController.getCustomerInfo
);
router.put('/info/:accountID/update', 
    customerController.updateCustomerInfo
);


module.exports = router;