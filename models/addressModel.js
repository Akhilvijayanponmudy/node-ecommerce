const mongoose = require('mongoose');
const User = require('./userModel');

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true,
            },
            addressLine1: {
                type: String,
                required: true,
            },
            addressLine2: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },

        }
    ]
});

module.exports=mongoose.model('Address',AddressSchema)
