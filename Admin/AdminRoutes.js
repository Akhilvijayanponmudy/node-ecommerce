const express = require('express');
const router = express.Router();

const dashboard = require('./dashboard/dashboardRoutes')
const products = require('./products/prodcutsRoutes')


router.use('/', dashboard)
router.use('/products', products)

module.exports = router