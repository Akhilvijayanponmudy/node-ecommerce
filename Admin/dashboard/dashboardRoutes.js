const express = require('express');
const router = express.Router();

const {Dashboard}=require('./dashboardController')

router.get('/',Dashboard)
module.exports = router