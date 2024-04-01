const express = require('express');
const router = express.Router();
const UserData = require('../../models/userdata');
const verifyJWT = require('../validators/verifyJWT')

const { buyView, paymentCalculation } = require('./buyController')

router.get('/:id', verifyJWT, buyView);
router.get('/payment-calculation/:base', verifyJWT, paymentCalculation);



module.exports = router;