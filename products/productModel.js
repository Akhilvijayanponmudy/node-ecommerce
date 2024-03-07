const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    primaryImage: {
        type: String, // Assuming the primary image is a single string path
        required: true,
    },
    imageGroup: {
        type: [String], // An array of strings for additional images
        default: [],    // Default to an empty array
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
