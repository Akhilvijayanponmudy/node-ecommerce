const express = require('express');
const router = express.Router();
const { productDashboard,createProduct, ProductForm, addCategory, categoryForm} = require('./productsController');
const productValidator = require('./validators/createProductValidator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get('/',productDashboard);
router.get('/add-product', ProductForm);
router.post('/add-product', upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'imageGroup', maxCount: 5 }]), productValidator, createProduct);

// Category Routes
router.get('/add-category', categoryForm); 
router.post('/add-category', addCategory); 

module.exports = router