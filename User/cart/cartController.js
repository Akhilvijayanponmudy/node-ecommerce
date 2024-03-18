const Cart = require('../../models/cartModel')
const cart = async (req, res) => {
    if (!req.user.userId) {
        return res.status(500).json({ message: 'user id not retreved through jwd' });
    }    
    const userId=req.user.userId;


    try {
        const cart = await Cart.findOne({userId});
        if(!cart){
            const newCart=new Cart({userId});
            await newCart.save();
            // return cart;
        }
        return res.json(cart);

    } catch (error) {
        console.log(error);
    }
}

const addToCart=async(req,res)=>{
    const productId='id';
    // const userId=req.user.userId;
    const userId='req.user.userId';

}

module.exports = {cart,addToCart}
