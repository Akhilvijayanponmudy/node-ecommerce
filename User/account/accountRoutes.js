const express = require('express');
const router = express.Router();
const verifyJWT = require('../validators/verifyJWT')
const { accountView, addressView, addAddress } = require('./accountController')


router.get('/', accountView);
router.get('/address',verifyJWT, addressView);
router.post('/address/add', verifyJWT, addAddress);


module.exports = router;