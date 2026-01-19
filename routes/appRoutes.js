const express = require('express');
const router = express.Router();
const signupController = require('../controller/signupController');
const loginController = require('../controller/loginController');

router.get('/', signupController.signupForm);
router.post('/', signupController.postForm);

router.get('/login', loginController.loginForm);
router.post('/login', loginController.postLogin);





module.exports=router;