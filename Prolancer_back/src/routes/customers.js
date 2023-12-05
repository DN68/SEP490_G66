const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');

router.get('/index', 
    customerController.getCustomersByStatusAndPaging
);
router.get('/info', 
    customerController.getCustomerInfo
);
router.put('/info/:accountID/update', 
    customerController.updateCustomerInfo
);
router.post('/create',
    customerController.customerRegister
);


module.exports = router;