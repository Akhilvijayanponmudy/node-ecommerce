const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel')
const { ObjectId } = require('mongodb');

const cart = async (req, res) => {
    if (!req.user.userId) {
        return res.status(500).json({ message: 'user id not retreved through jwd' });
    }
    const userId = req.user.userId;
    try {
        const cartItems = await Cart.findOne({ userId });


        // console.log(cartItems);
        // {
        //     productId: new ObjectId('665d6cbc3db3a1f533999e09'),
        //     quantity: 4,
        //     _id: new ObjectId('666020d7ffd7f7b12b16c2bb')
        //   },


        // const cartItemsArr = cartItems.items.map(cartitem => {
        //     // console.log(cartitem.productId);
        //     // console.log(cartitem.quantity);

        //     const productArr = await Product.findById(cartitem.productId);
        //     console.log(productArr);

        // });


        // const populatedItems = await Promise.all(
        //     cartItems.items.map(async (cartitem) => {
        //         const product = await Product.findById(cartitem.productId);

        //         console.log(product);

        //         if (!product) {
        //             return res.status(299).json({ success: false, message: 'something went wrong' });

        //         }

        //         // return {
        //         //     id: product._id,
        //         //     name: product.productName,
        //         //     img: product.primaryImage,
        //         //     price: product.productCurrentPrice,
        //         //     quantity: cartitem.quantity,
        //         // };
        //     })
        // );


        // console.log(populatedItems);
        const baseURl = 'http://localhost:5000/uploads/'
        const populatedItems = await Promise.all(
            cartItems.items.map(async (cartitem) => {
                const productID = cartitem.productId.toString();
                const product = await Product.findById(productID);

                if (product) {
                    return {
                        id: product._id.toString(),
                        name: product.productName,
                        img: baseURl + product.primaryImage,
                        price: product.productCurrentPrice,
                        quantity: cartitem.quantity,
                    };
                }else{
                    return null;
                }

            })
        );
        const validPopulatedItems = populatedItems.filter(item => item !== null);
        console.log(populatedItems);

        return res.status(201).json({ success: true, message: 'success', cartArr: validPopulatedItems });



    } catch (error) {
        console.error('Error populating cart items:', error);
        return res.status(500).json({ error: 'Error populating cart items' });
    }
}

const addToCart = async (req, res) => {



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

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: id } } },
            { new: true }
        );
        // console.log(updatedCart);
        res.json({ status: true, message: "done" });
    } catch (error) {
        res.json({ 'status': false, 'error': error });
    }
}

module.exports = { cart, addToCart, removeFromCart }