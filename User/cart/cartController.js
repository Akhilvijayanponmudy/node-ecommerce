const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel')
const { ObjectId } = require('mongodb');

const cart = async (req, res) => {
    if (!req.user.userId) {
        return res.status(500).json({ message: 'user id not retreved through jwd' });
    }
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = new Cart({ userId });
            await newCart.save();
            // return cart;
        }

        const populatedItems = await Promise.all(
            cart.items.map(async (item) => {
                const product = await Product.findById(item.productId);
                // console.log(product);
                return {
                    id: product._id,
                    name: product.productName,
                    img: product.primaryImage,
                    price: product.productCurrentPrice,
                    quantity: item.quantity,
                };
            })
        );
        return res.json(populatedItems);

    } catch (error) {
        console.log(error);
    }
}

const addToCart = async (req, res) => {
    // const { productId, quantity } = req.body;

    // const productId = '65f33fb6c6ffdc91a4dc4194';
    const { id } = req.params;
    const { quantity } = req.body;
    const productId = id;

    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const cartProduct = await Product.findById(productId);
        if (!cartProduct) {
            return res.status(400).json({ message: 'Product not found' });
        }
        const userId = req.user.userId;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId });
        }
        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if (existingItem) {
            if (quantity === 1) {
                existingItem.quantity += quantity;
            } else if (quantity === -1) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    console.log('Minimum quantity reached, cannot decrement further.');
                }
            }
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.json({ status: true, message: 'Item  added to cart' });
    } catch (error) {
        console.log(error);
    }
}


const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // let userCart = await Cart.findOne({ userId });
        // const targetProductId = ObjectId.createFromTime(id);
        // const updatedCart = userCart.items.filter(item => item.id.toString() !== targetProductId.toString());
        // userCart.items = updatedCart;
        // console.log(updatedCart);
        // await userCart.save();

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: id } } },
            { new: true } // Return the updated document
        );
        // console.log(updatedCart);
        res.json({ 'status': true, 'message': "done" });
    } catch (error) {
        res.json({ 'status': false, 'error': error });
    }
}

module.exports = { cart, addToCart, removeFromCart }