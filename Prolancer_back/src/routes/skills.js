const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/SkillController');

router.put('/updateSkillScore', 
SkillController.updateManySkillScore

);
router.get('/getSkillChild/:id', 
SkillController.getSkillWithMajorID

);
router.get('/getSkillScore', 
SkillController.getAllFreelancerWithSkillScore

);
router.get('/getMajorSkill', 
SkillController.getAllMajorSkill

);


module.exports = router;