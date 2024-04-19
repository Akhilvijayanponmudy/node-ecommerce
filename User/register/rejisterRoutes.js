const express = require('express');
const router = express.Router();
const { userRegistration } = require('./registerControlls')

router.post('/', userRegistration)

module.exports = router;