const express = require('express');
const router = express.Router();

const home = require('./home/homeRotes')
const products = require('./products/prodcutsRoutes')


router.use('/', home)
router.use('/products', products)

module.exports = router