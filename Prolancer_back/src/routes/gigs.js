const express = require('express');
const router = express.Router();
const gigController = require('../controllers/GigController');

router.get('/details/:id',
    gigController.getGigById
);
router.get('/index',
    gigController.getGigWithFilterAndPagingAndSearching
);
router.get('/index/freelancer',
    gigController.getGigByFreelancer
);

router.get('/:FreelancerID/:Status',
    gigController.getGigByFreelancerIdAndStatus
);

router.get('/:FreelancerID/:Status',
    gigController.getGigByFreelancerIdAndStatus
);

router.post('/create',
    gigController.createGig
)

router.put('/:GigID/update',
    gigController.updateGig
)

router.put('/:GigID/updateStatus',
    gigController.updateGigStatus
)

router.put('/updateStatus',
    gigController.changeGigStatus
)
module.exports = router;