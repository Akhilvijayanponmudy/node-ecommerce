const express = require('express');
const router = express.Router();
const { createProduct, productList, ProductForm, productDetail, addCategory, categoryForm,categoryList,categoryProducts } = require('./productsController');
const productValidator = require('./validators/createProductValidator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get('/', ProductForm);
// router.post('/', upload.single('productImage'),productValidator, createProduct);
router.post('/', upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'imageGroup', maxCount: 3 }]), productValidator, createProduct);
router.get('/list', productList);
router.get('/detail/:productId', productDetail)
router.post('/', addCategory)

// Category Routes
router.get('/add-category', categoryForm);  // Display the category form
router.post('/add-category', addCategory);  // Handle category creation
router.get('/cat-list',categoryList);
router.get('/cat-products',categoryProducts);

module.exports = router