const Product = require('../../models/productModel')

const buyView = async (req, res) => {
    const productId = `65fa6b1a2e331f2a0d8cbabf`;
    try {
        const productArr = await Product.findById(productId);
        if (productArr) {
            res.json({ 'message': 'success', 'product': productArr })
        }
    } catch (error) {
        console.log(error);
    }
    res.json({ 'message': 'buy' })
}
module.exports = {
    buyView
}