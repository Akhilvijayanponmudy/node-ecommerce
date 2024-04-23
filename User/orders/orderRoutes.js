const express = require('express');
const router = express.Router();
const verifyJWT = require('../validators/verifyJWT')
const { ordersList, orderCancel } = require('./orderController')

router.get('/', verifyJWT, ordersList);
router.get('/cancel/:id', verifyJWT, orderCancel)


module.exports = router