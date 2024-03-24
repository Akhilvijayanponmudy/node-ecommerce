const Product = require('../../models/productModel')

const buyView = async (req, res) => {
    // console.log(req.params.id);
    try {
        const productId = req.params.id;
        console.log(productId);
        const productArr = await Product.findById(productId);
        if (productArr) {
            res.json({ 'message': 'success', 'product': productArr })
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    buyView
}