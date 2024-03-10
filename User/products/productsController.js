const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');


const productList = async (req, res) => {
    const allProducts = await Product.find({});
    res.render('user/products/productList', { products: allProducts });
}

const productDetail = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.render('user/products/productDetail', { product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ successful: false, error: 'Internal server error' });
    }
}


const categoryList = async (req, res) => {
    const allCat = await Category.find();
    console.log(allCat);
    res.render('user/products/categoryList', { catArr: allCat });
}

const categoryProducts= async(req,res)=>{
    res.render('user/products/categoryProducts')
}

module.exports = {
    productList,
    productDetail,
    categoryList,
    categoryProducts
};
