const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            paymentId: {
                type: String,
                required: true
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productQandity: {
                type: String,
                required: true
            },
            productAmount: {
                type: String,
                required: true
            },
            shippingAddress: {
                type: String,
                required: true
            },
            productStatus: {
                type: String,
                required: true,
                default: 'open'
            },
            shippingStatus: {
                type: String,
                required: true,
                default: 'Orderd'
            }
        }
    ],

});

const OrderModel = mongoose.model('OrderModel', orderSchema);
module.exports = OrderModel;