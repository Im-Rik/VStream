const express = require('express');
const router = express.Router();
const { handleLoadingHomePage } = require('../controllers/home');

router
  .route('/')
  .get(handleLoadingHomePage);



module.exports = router; 
