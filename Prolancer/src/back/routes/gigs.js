const express = require('express');
const router = express.Router();
const gigController = require('../controllers/GigController');



router.get('/index',
    gigController.getGigWithFilterAndPagingAndSearching
);

router.get('/details/:id',
    gigController.getGigById
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


module.exports = router;