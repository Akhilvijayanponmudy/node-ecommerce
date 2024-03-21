const express = require('express');
const router = express.Router();

const home = require('./home/homeRotes');
const products = require('./products/prodcutsRoutes');
const login = require('./login/loginRoutes');
const cart = require('./cart/cartRoutes')
const buy = require('./buy/buyRoutes')
const account = require('./account/accountRoutes')

router.use('/', home);
router.use('/products', products);
router.use('/login', login);
router.use('/cart', cart);
router.use('/buy', buy);
router.use('/account', account);

module.exports = router;