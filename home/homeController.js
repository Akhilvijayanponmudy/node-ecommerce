// const Category = require('../products/categoryModel');

// const homePage = async (req, res) => {

//     const categoryArr=await Category.find({},{categoryName:1,primaryImage:1});

//     res.json({ categoryArr:categoryArr });
// }

// module.exports = homePage;

const Category = require('../products/categoryModel');

const homePage = async (req, res) => {
    const baseImageUrl = 'http://localhost:5000'; // Change this to your server's base URL
    const categoryArr = await Category.find({}, { categoryName: 1, primaryImage: 1 });

    // Prepend the base URL to each category's primaryImage
    const categoryArrWithFullUrl = categoryArr.map(category => ({
        ...category.toObject(),
        primaryImage: `${baseImageUrl}/images/${category.primaryImage}`
    }));

    res.json({ categoryArr: categoryArrWithFullUrl });
};

module.exports = homePage;
