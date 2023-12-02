const express = require('express');
const router = express.Router();
const CvController = require('../controllers/CvController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/:cvName',
        CvController.getCV
);

router.post('/createCV',
        CvController.createCV
);

router.post('/updateCV',
        CvController.updateCV
);

router.post('/saveCV',
        CvController.saveCV
);



module.exports = router;