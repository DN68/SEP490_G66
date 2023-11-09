const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');


router.get('/get', 
    categoryController.getCategory
  
  
  );


module.exports = router;