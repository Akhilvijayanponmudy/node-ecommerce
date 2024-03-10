const productValidator = (req, res, next) => {
    const { productName, productPrice } = req.body;
    // const productImage = req.file.filename;

    // if (!productName || !productPrice || !productImage) {
    if (!productName || !productPrice) {
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
