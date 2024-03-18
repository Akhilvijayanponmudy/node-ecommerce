const express = require('express');
const router = express.Router();
const { loginForm,loginValidate } = require('./loginController');


router.get('/', loginForm);
router.post('/',loginValidate);


module.exports = router
