const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/DeliveryController');

router.put('/deliverAgain', 
DeliveryController.deliverAgain
);
router.put('/declineDelivery', 
DeliveryController.declineDelivery
);
router.put('/approveDelivery', 
DeliveryController.approveDelivery
);
router.get('/getDeliveryByOrderId', 
DeliveryController.getDeliveryByOrderId
);
router.post('/createDelivery',
DeliveryController.createDelivery
);



module.exports = router;