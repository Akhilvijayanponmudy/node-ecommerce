// categorySeeder.js
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
  mongoose.connect('mongodb+srv://akhilv:Vth9V8RiALZKLOYq@akhilvijayan.79nyak4.mongodb.net/');


// Sample data to seed the Category collection
const categories = [
  {
    categoryName: 'Mobiles',
    primaryImage: 'toys-category-image.png',
  },
  {
    categoryName: 'Speakers',
    primaryImage: 'shoes.png',
  },
  {
    categoryName: 'Watches',
    primaryImage: 'watch-cat.png',
  },
  {
    categoryName: 'Laptops',
    primaryImage: 'electronics-category-image.png',
  },
  // Add more categories as needed
];

// Function to seed the Category collection
const seedCategories = async () => {
  try {
    // Remove existing documents in the Category collection
    await Category.deleteMany();

    // Insert the sample data into the Category collection
    await Category.insertMany(categories);

    console.log('Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Invoke the seeder function
seedCategories();
