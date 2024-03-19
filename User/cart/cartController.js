const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel')
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
        return res.json(cart);

    } catch (error) {
        console.log(error);
    }
}

const addToCart = async (req, res) => {
    // const { productId, quantity } = req.body;

    const productId = '65f33fb6c6ffdc91a4dc4194';
    const quantity = 1;
    // const userId=req.user.userId;

    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const cartProduct = await Product.findById(productId);
        if (!cartProduct) {
            return res.status(400).json({ message: 'Product not found' });
        }
        const userId = 'req.user.userId';
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId });
        }

        const existingItem = cart.items.find(item => item.productId.equals(productId));

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        res.json({ message: 'Item added to cart' });

    } catch (error) {
        console.log(error);
    }

}

module.exports = { cart, addToCart }
