const express = require('express');
const router = express.Router();
const {handleUserSignUp, handleUserSignIn} = require('../controllers/users')

router
.route('/signup')
.post(handleUserSignUp) 

router
.route('/login')
.post(handleUserSignIn) 

module.exports = router; 