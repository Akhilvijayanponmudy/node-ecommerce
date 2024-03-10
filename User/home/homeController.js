const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel')
const homePage = async (req, res) => {
    const baseImageUrl = 'http://localhost:5000'; // Change this to your server's base URL
    const categoryArr = await Category.find({}, { categoryName: 1, primaryImage: 1 });
    const ProductArr = await Product.find({}).sort({ createdAt: -1 }).limit(9);

    // Prepend the base URL to each category's primaryImage
    const categoryArrWithFullUrl = categoryArr.map(category => ({
        ...category.toObject(),
        primaryImage: `${baseImageUrl}/images/${category.primaryImage}`
    }));

    res.json({ categoryArr: categoryArrWithFullUrl, productArr: ProductArr });
};

module.exports = homePage;
