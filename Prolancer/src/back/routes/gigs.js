const express = require('express');
const router = express.Router();
const gigController = require('../controllers/GigController');


router.get('/index',
    gigController.getGigWithFilterAndPagingAndSearching


);
router.get('/details/:id',
    gigController.getById


);

module.exports = router;