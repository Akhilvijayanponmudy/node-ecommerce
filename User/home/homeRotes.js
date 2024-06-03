const express = require('express');
const router = express.Router();
const { homePage, homeLatestProducts,productcategoris } = require('./homeController');


router.get('/', homePage);
router.get('/latest-products', homeLatestProducts);
router.get('/product-categories', productcategoris);

module.exports = router