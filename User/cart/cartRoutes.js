const express = require('express');
const router = express.Router();
const { cart, addToCart, removeFromCart } = require('./cartController');
const verifyJWT = require('../validators/verifyJWT')



router.get('/', verifyJWT, cart);
router.post('/add-to-cart/:id', verifyJWT, addToCart);
router.post('/remove-from-cart/:id', verifyJWT, removeFromCart);


module.exports = router
