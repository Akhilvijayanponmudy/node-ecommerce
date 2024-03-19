const express = require('express');
const router = express.Router();
const homePage  = require('./homeController');


router.get('/', homePage);

module.exports = router