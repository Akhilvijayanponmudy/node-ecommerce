const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel')
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

module.exports = homePage;
