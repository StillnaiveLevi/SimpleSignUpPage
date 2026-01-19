const express = require('express');
const router = express.Router();
const appController = require('../controller/appController');

router.get('/', appController.signupForm);
router.post('/', appController.postForm);




module.exports=router;