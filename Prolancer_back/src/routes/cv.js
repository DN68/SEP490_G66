const express = require('express');
const router = express.Router();
const CvController = require('../controllers/CvController');

router.get('/:cvName',
        CvController.getCV
);

router.post('/createCV',
        CvController.createCV
);

router.post('/saveCV',
        CvController.saveCV
);



module.exports = router;