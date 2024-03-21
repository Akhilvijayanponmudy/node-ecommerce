const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    addressone: {
        type: String,
        required: false,
    },
    addresstwo: {
        type: String,
        required: false,
    },
    addressthree: {
        type: String,
        required: false,
    },
    addressfour: {
        type: String,
        required: false,
    },
});

const UserData = mongoose.model('UserData', userDataSchema);
module.exports = UserData;
