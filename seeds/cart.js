const mongoose = require('mongoose');
const Cart = require('../models/cartModel'); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');

// Dummy cart data
const cartData = {
  userId: '65f8070b2c58d219c81b718d', // User ID for the cart
  items: [
    {
      productId: '65ef3e75700bdb500f3fd395', // Example product ID
      quantity: 2,
    },
    {
      productId: '65f33fb6c6ffdc91a4dc4194', // Example product ID
      quantity: 1,
    },
    // Add more dummy items as needed
  ],
};

// Seed function
const seedCart = async () => {
  try {
    // Create a new cart document
    const cart = new Cart(cartData);

    // Save the cart document to the database
    await cart.save();

    console.log('Cart seeded successfully');
  } catch (error) {
    console.error('Error seeding cart:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Run the seed function
seedCart();
