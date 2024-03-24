const Address = require('../../models/addressModel');

const accountView = (req, res) => {
    res.json({ 'message': 'account page' })
}
const addressView = (req, res) => {
    res.json({ 'message': 'Address page' })
}

const addAddress = async (req, res) => {
    const userId = req.user.userId;

    res.status(201).json({successful: true, message: "Address added successfully"});

    const { name, addressLine1, addressLine2, city, state, zip } = req.body.data;
    console.log(name);
    if (!name || !addressLine1 || !addressLine2 || !city || !state || !zip) {
        res.status(403).json({ successful: false, message: "missing details" });
    }
    if (!userId) {
        res.status(403).json({ successful: false, message: "token validation falied" });
    }
    const address ={ userId, name, addressLine1, addressLine2, city, state, zip };
    const newAddress = new Address({ 
        userId:userId,
        items: [address]
    });
    await newAddress.save();
    res.status(201).json({successful: true, message: "Address added successfully"});
}

module.exports = {
    accountView,
    addressView,
    addAddress
}