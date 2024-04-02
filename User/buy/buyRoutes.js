const express = require('express');
const router = express.Router();
const UserData = require('../../models/userdata');
const verifyJWT = require('../validators/verifyJWT')

const { buyView, paymentCalculation, paymentSuccess } = require('./buyController')

router.get('/:id', verifyJWT, buyView);
// router.get('/payment-calculation/:base', verifyJWT, paymentCalculation);
router.post('/payment', verifyJWT, paymentSuccess);



module.exports = router;