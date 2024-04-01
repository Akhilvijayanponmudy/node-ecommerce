const mongoose = require('mongoose');
const Product = require('../../models/productModel')

const buyView = async (req, res) => {
    // console.log(req.params.id);
    try {
        const productId = req.params.id;
        console.log(productId);
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ 'message': 'Invalid productId' });
        }
        const productArr = await Product.findById(productId);
        if (productArr) {
            res.json({ 'message': 'success', 'product': productArr })
        }
    } catch (error) {
        console.log(error);
    }
}


const paymentCalculation = async (req, res) => {
    // console.log(req.query.productId);
    console.log(req.query.addressId);
    const productId = req.query.productId;
    if (!mongoose.isValidObjectId(productId)) {
        return res.status(400).json({ 'message': 'Invalid productId' });
    }

    const productArr = await Product.findById(productId);
    if (productArr) {
        res.json({ 'message': 'success', 'price': productArr.productCurrentPrice })
    } else {
        res.json({ 'status': 'false', 'message': 'no product found' });

    }

}


module.exports = {
    buyView,
    paymentCalculation,
}