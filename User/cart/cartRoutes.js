const express = require('express');
const router = express.Router();
const { cart, addToCart } = require('./cartController');
const verifyJWT = require('../validators/verifyJWT')



router.get('/', verifyJWT, cart);
router.post('/add-to-cart/:id',verifyJWT, addToCart);


module.exports = router
