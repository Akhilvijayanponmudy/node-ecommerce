const express = require('express');
const router = express.Router();
const UserData = require('../../models/userdata')
const { buyView } = require('./buyController')

router.get('/:id', buyView);



module.exports = router;