const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/InterviewController');


router.get('/index', 
    interviewController.getInterviewsByStatusAndPaging
);
router.put('/updateStatus',
    interviewController.changeInterviewStatus
)

module.exports = router;