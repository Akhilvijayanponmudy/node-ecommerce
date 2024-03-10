const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');


const productDashboard=async(req,res)=>{
    const allProducts = await Product.find({});

    res.render('admin/products/productDashboard',{productsArr:allProducts})
}

const ProductForm = async (req, res) => {
    const categories = await Category.find({}, 'categoryName'); // Assuming your Category model has a 'categoryName' field

    res.render('admin/products/productForm', { categories });
}

const createProduct = async (req, res) => {
    try {
        const { productName, productPrice, category } = req.body;
        // Check if primary image and image group were uploaded
        if (!req.files || !req.files.primaryImage || !req.files.imageGroup || req.files.imageGroup.length === 0) {
            return res.status(400).json({ successful: false, error: 'Primary image and image group are required' });
        }
        // Get the filenames of the uploaded primary image and image group
        const primaryImage = req.files.primaryImage[0].filename;
        const imageGroup = req.files.imageGroup.map(file => file.filename);

        // Save to MongoDB
        const newProduct = new Product({ productName, productPrice, primaryImage, imageGroup, category });
        await newProduct.save();
        // Send success response
        res.status(201).json({ successful: true, message: 'Product created successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        // Send error response
        res.status(500).json({ successful: false, error: 'Internal server error' });
    }
};

const categoryForm = async (req, res) => {
    res.render('admin/products/addCategory');
}
const addCategory = async (req, res) => {
    try {
        const { catName } = req.body;
        if (catName) {
            const newCat = new Category({ categoryName: catName });
            await newCat.save();
            res.status(201).json({ successful: true, message: 'Category added successfully' });
        } else {
            // Handle the case when catName is not provided
            res.status(400).json({ successful: false, error: 'Category name is required' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ successful: false, error: 'Internal server error' });
    }
};



module.exports = {
    ProductForm,
    createProduct,
    addCategory,
    categoryForm,
    productDashboard,
};
