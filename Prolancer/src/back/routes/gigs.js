const express = require('express');
const router = express.Router();
const gigController = require('../controllers/GigController');


router.get('/index',
    gigController.getGigWithFilterAndPagingAndSearching
);

router.get('/:FreelancerID',
    gigController.getGigsByFreelancer
);

router.get('/details/:id',
    gigController.getGigById
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