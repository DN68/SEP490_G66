const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/InterviewController');


router.get('/index', 
    interviewController.getInterviewsByStatusAndPaging
);
router.put('/updateStatus',
    interviewController.changeInterviewStatus
)
router.post('/create',
    interviewController.createInterview
)
router.put('/update',
    interviewController.changeInterviewInfo
)
router.put('/sendSchedule',
    interviewController.sendInterviewSchedule
)

module.exports = router;