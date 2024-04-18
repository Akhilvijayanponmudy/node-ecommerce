const express= require('express');
const router=express.Router();
const verifyJWT = require('../validators/verifyJWT')
const {ordersList} =require('./orderController')

router.get('/', verifyJWT, ordersList);


module.exports = router