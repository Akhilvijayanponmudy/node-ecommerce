const express = require('express');
const router = express.Router();
const {  productList, productDetail,categoryList,categoryProducts } = require('./productsController');


router.get('/', productList);
router.get('/detail/:productId', productDetail)
router.get('/cat-list',categoryList);
router.get('/cat-products',categoryProducts);

module.exports = router
