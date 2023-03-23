const express = require('express');  //make express available in this fil

const router = express.Router();
const authController = require('../controllers/auth-controller')//import function in controller

router.get('/signup',authController.UserSignup);

router.get('/login',authController.UserLogin);

router.post('/signup',authController.signup)

module.exports = router;