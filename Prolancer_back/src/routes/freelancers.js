const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/FreelancerController');

router.get('/index', 
    freelancerController.getfreelancersByStatusAndPaging
);
router.get('/info', 
    freelancerController.getFreelancerInfo
);
router.put('/info/:accountID/update', 
    freelancerController.updateFreelancerInfo
);
router.post('/create',
    freelancerController.freelancerRegister
);
module.exports = router;