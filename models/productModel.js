const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productBrand: {
        type: String,
        required: true,
    },
    productActualPrice: {
        type: Number,
        required: true,
    },
    productCurrentPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
    },
    primaryImage: {
        type: String,
        required: true,
    },
    imageGroup: {
        type: [String],
        default: [],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
