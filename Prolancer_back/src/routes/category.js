const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');


router.get('/get', 
    categoryController.getAllCategory
  );

module.exports = router;