const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.get('/getReviewByOrderId', 
ReviewController.getReviewByOrderId

);


router.post('/createReview',
ReviewController.createReview

);



module.exports = router;