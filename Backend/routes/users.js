const express = require('express');
const router = express.Router();
const {handleUserSignUp, handleUserSignIn, handleVerifyUserToken} = require('../controllers/users')

router
.route('/signup')
.post(handleUserSignUp) 

router
.route('/login')
.post(handleUserSignIn) 

router
.route('/verify-token')
.post(handleVerifyUserToken)

module.exports = router; 