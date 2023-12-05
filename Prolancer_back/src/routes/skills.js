const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/SkillController');

router.get('/getSkillScoreByFreelancerID/:id',
SkillController.getSkillScoreByFreelancerID


);
router.put('/updateSkillScore', 
SkillController.updateManySkillScore

);
router.get('/getSkillChild/:id', 
SkillController.getSkillWithMajorID

);
router.get('/getSkillScore', 
SkillController.getFreelancerWithSkillScore

);
router.get('/getMajorSkill', 
SkillController.getAllMajorSkill

);


module.exports = router;