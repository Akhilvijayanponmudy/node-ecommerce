const mongoose = require('mongoose');
const Product = require('../../models/productModel');
const OrderModel = require('../../models/ordersModel');
const Cart = require('../../models/cartModel');
const Address = require('../../models/addressModel');

const buyView = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.userId;

    if (productId === 'cart') {
        const productsArray = [];
        try {
            const productArr = await Cart.findOne({ userId });
            const data = productArr.items;
            let totalCost = 0;

            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const productID = item.productId.toString();
                const productQuandity = item.quantity;
                try {
                    const product = await Product.findOne({ _id: productID });

                    if (product) {
                        const productPrice = product.productCurrentPrice;
                        const productTotalCost = productPrice * productQuandity;
                        totalCost += productTotalCost;
                        // productsArray.push(product);

                        productsArray.push({
                            ...product.toObject(),
                            productQuantity: productQuandity,
                            productTotalCost: productTotalCost
                        });


                    } else {
                        console.log(`No product ound in the product ID` + productID);
                    }
                } catch (error) {
                    console.log(error);

                }
            }
            console.log(productsArray);
            res.status(201).json({ successful: true, 'product': productsArray, 'totalPrice': totalCost });

        } catch (error) {
            console.log(error);
            res.status(204).json({ successful: false, 'message': 'something  went wrong' });

        }

    } else {
        try {
            if (!mongoose.isValidObjectId(productId)) {
                return res.status(400).json({ 'message': 'Invalid productId' });
            }
            const productArr = await Product.findById(productId);
            if (productArr) {
                res.status(201).json({ successful: true, 'product': productArr, 'totalPrice': productArr.productCurrentPrice });

            }
        } catch (error) {
            console.log(error);
            // res.json({ 'status': 'false', 'product': productArr })
            res.status(204).json({ successful: false, 'message': 'something  went wrong' });
        }
    }

}


const paymentCalculation = async (req, res) => {
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

const paymentSuccess = async (req, res) => {
    const userId = req.user.userId;

    if (userId) {
        const { paymentId, amount, address, state } = req.body;
        const shippingAddress = await Address.findOne({ userId });

        console.log(address);


        const shippingAddress = shippingAddress.items.find(item => item._id.toString() === address);
        // console.log(actualAddress);

        try {
            let oredrschema = await OrderModel.findOne({ userId });
            if (!oredrschema) {
                oredrschema = new OrderModel({ userId })
            }
            const productId = '65fa6bda2e331f2a0d8cbace';
            const productQandity = 1;
            const productAmount = 500;
            const address = 'akhil test address';


            await oredrschema.items.push({ productId, productQandity, productAmount, shippingAddress });
            await oredrschema.save();
            res.json({ status: true, message: 'Item added to orders' });

        } catch (error) {
            console.log(error);
            res.json({ status: false, message: 'Error occurs' });

        }
    }
}

module.exports = {
    buyView,
    paymentCalculation,
    paymentSuccess
}