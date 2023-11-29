const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/FreelancerController');


router.get('/info', 
    freelancerController.getFreelancerInfo
);
router.put('/info/:accountID/update', 
    freelancerController.updateFreelancerInfo
);

module.exports = router;