const express = require('express');
const router = express.Router();
const {  productList, productDetail,categoryList,categoryProducts } = require('./productsController');


router.get('/', productList);
router.get('/category/:catID', categoryProducts);
router.get('/detail/:productId', productDetail)
router.get('/cat-list/',categoryList);

module.exports = router
