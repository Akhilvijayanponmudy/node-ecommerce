const mongoose = require('mongoose');
const Product = require('./productModel');


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Minimum quantity is 1
      },
      // Optional fields (consider adding these based on your needs)
      // price: { type: Number, required: true }, // Price per item (can be calculated from product)
      // size: { type: String },
      // color: { type: String },
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
