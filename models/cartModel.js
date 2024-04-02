const mongoose = require('mongoose');
const Product = require('./productModel');


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Minimum quantity is 1
      },
    },
  ],
});

// Pre-save hook to calculate total cart price (optional)
cartSchema.pre('save', async function (next) {
  const cart = this;
  cart.totalPrice = 0; // Initialize total price
  for (const item of cart.items) {
    // Fetch product details to get price (assuming a Product model exists)
    const product = await mongoose.model('Product').findById(item.productId);
    cart.totalPrice += product.price * item.quantity;
  }
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
