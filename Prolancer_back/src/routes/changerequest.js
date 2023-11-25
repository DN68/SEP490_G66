const express = require('express');
const router = express.Router();
const ChangeRequestController = require('../controllers/ChangeRequestController');

router.put('/changeChangeRequestStatus', 
ChangeRequestController.changeChangeRequestStatus

);
router.post('/createChangeRequest', 
ChangeRequestController.createChangeRequest

);
router.get('/getChangeRequest', 
ChangeRequestController.getChangeRequestWithPagingAndFilter

);



module.exports = router;