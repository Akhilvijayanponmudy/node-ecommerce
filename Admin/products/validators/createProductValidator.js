const productValidator = (req, res, next) => {
    const { productName, productCurrentPrice,productActualPrice,category } = req.body;
    // const productImage = req.file.filename;

    // if (!productName || !productPrice || !productImage) {

    if (!productName || !productCurrentPrice || !productActualPrice  || !category) {
        res.json({
            successful: false,
            error: {
                message: "Product name, product price, and product image are required."
            }
        });
    } else {
        // If all required fields are present, continue to the next middleware
        next();
    }
};

module.exports = productValidator;
