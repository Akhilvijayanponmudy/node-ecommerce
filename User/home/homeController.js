const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');


const homePage = async (req, res) => {
    const baseImageUrl = 'http://localhost:5000';
    const categoryArr = await Category.find({}, { categoryName: 1, primaryImage: 1 });
    const ProductArr = await Product.find({}).sort({ createdAt: -1 }).limit(8);

    const productsWithFullUrl = ProductArr.map(product => {
        return {
            ...product._doc,
            primaryImage: `${baseImageUrl}/uploads/${product.primaryImage}`
        };
    });


    const categoryArrWithFullUrl = categoryArr.map(category => ({
        ...category.toObject(),
        primaryImage: `${baseImageUrl}/images/${category.primaryImage}`
    }));

    res.json({ categoryArr: categoryArrWithFullUrl, productArr: productsWithFullUrl });
};

const homeLatestProducts = async (req, res) => {
    const baseImageUrl = 'http://localhost:5000/uploads';
    const ProductArr = await Product.find({}).sort({ createdAt: -1 }).limit(12);

    const ProductCardArr = ProductArr.map(product => ({
        id: product._id,
        productName: product.productName,
        productBrand: product.productBrand,
        productActualPrice: product.productActualPrice,
        productCurrentPrice: product.productCurrentPrice,
        primaryImage: `${baseImageUrl}/${product.primaryImage}`
    }));

    res.status(201).json({ successful: true, message: 'API Successs', productArr: ProductCardArr });

}
const productcategoris = async (req, res) => {
    const baseImageUrl = 'http://localhost:5000/uploads/category';
    const categoryArr = await Category.find({}, { categoryName: 1, primaryImage: 1 });

    const catArr = categoryArr.map(categories => ({
        id: categories._id,
        categoryName: categories.categoryName,
        categoryImg: `${baseImageUrl}/${categories.primaryImage}`
    }));


    res.status(201).json({ successful: true, message: 'API Successs', categoryArr: catArr });

}

module.exports = { homePage, homeLatestProducts, productcategoris };