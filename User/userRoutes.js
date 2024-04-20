const express = require('express');
const router = express.Router();

const home = require('./home/homeRotes');
const products = require('./products/prodcutsRoutes');
const login = require('./login/loginRoutes');
const cart = require('./cart/cartRoutes');
const buy = require('./buy/buyRoutes');
const account = require('./account/accountRoutes');
const orders =require('./orders/orderRoutes');
const register =require('./register/rejisterRoutes');


router.use('/', home);
router.use('/products', products);
router.use('/login', login);
router.use('/cart', cart);
router.use('/buy', buy);
router.use('/account', account);
router.use('/orders', orders);
router.use('/register', register);

module.exports = router;