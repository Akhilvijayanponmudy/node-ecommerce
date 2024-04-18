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
        const { paymentId, productAmount, address, state,paymentMethod } = req.body;
        const addressArray = await Address.findOne({ userId });
        const shippingAddress = addressArray.items.find(item => item._id.toString() === address);
        console.log(paymentMethod);
        if (state != 'cart') {

            try {
                let oredrschema = await OrderModel.findOne({ userId });
                if (!oredrschema) {
                    oredrschema = new OrderModel({ userId })
                }
                const productQandity = 1;
                const productId = state;
                await oredrschema.items.push({ paymentId, productId, productQandity, productAmount, shippingAddress ,paymentMethod});
                await oredrschema.save();
                res.json({ status: true, message: 'Item added to orders' });
            } catch (error) {
                console.log(error);
                res.json({ status: false, message: 'Error occurs' });
            }

        } else if (state === 'cart') {

            const addressArray = await Address.findOne({ userId });
            const cartArr = await Cart.findOne({ userId });
            const dataArr = cartArr.items;
            try {
                let oredrschema = await OrderModel.findOne({ userId });
                if (!oredrschema) {
                    oredrschema = new OrderModel({ userId })
                }

                for (let i = 0; i < dataArr.length; i++) {
                    const item = dataArr[i];
                    const productQandity = item.quantity;
                    const productId = item.productId.toString();
                    const cartProductArr = await Product.findById(productId);
                    const productAmount = cartProductArr.productCurrentPrice;
                    await oredrschema.items.push({ paymentId, productId, productQandity, productAmount, shippingAddress,paymentMethod });

                }
                await oredrschema.save();


                // const shippingAddress = addressArray.items.find(item => item._id.toString() === address);
                res.json({ status: true, message: 'Item added to orders' });



            } catch (error) {
                console.log(error);
                res.json({ status: false, message: 'Error occurs' });

            }

        }



    }
}

module.exports = {
    buyView,
    paymentCalculation,
    paymentSuccess
}