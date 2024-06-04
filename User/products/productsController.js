const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');


const productList = async (req, res) => {
    const allProducts = await Product.find({});
    res.json({ products: allProducts });
}

const productDetail = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.json({ productDetail: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ successful: false, error: 'Internal server error' });
    }
}


const categoryList = async (req, res) => {
    const allCat = await Category.find();
    res.render('user/products/categoryList', { catArr: allCat });
}

const categoryProducts = async (req, res) => {

    const categoryId = req.params.catID;
    if (categoryId) {
        const ProductArr = await Product.find({ category: categoryId }).limit(12);
        const baseImageUrl = 'http://localhost:5000/uploads';

        // const ProductArr = await Product.find({}).sort({ createdAt: -1 }).limit(12);

        const productsArray = ProductArr.map(product => ({
            id: product._id,
            productName: product.productName,
            productBrand: product.productBrand,
            productActualPrice: product.productActualPrice,
            productCurrentPrice: product.productCurrentPrice,
            primaryImage: `${baseImageUrl}/${product.primaryImage}`
        }));



        res.status(201).json({ successful: true, message: 'API Successs', productArr: productsArray });

    } else {
        res.json({ message: 'no products fount' })

    }
}

module.exports = {
    productList,
    productDetail,
    categoryList,
    categoryProducts
};
