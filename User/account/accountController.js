const Address = require('../../models/addressModel');

const accountView = (req, res) => {
    res.json({ 'message': 'account page' })
}
const addressView = async (req, res) => {
    try {
        const userId = req.user.userId;
        const addressSchema = await Address.findOne({ userId });
        res.status(201).json({ successful: true, addressArr: addressSchema });
    } catch (error) {
        res.status(299).json({ successful: false, message: error });

    }
}

const addAddress = async (req, res) => {

    try {
        const userId = req.user.userId;
        let addressSchema = await Address.findOne({ userId });

        if (!addressSchema) {
            const { name, addressLine1, addressLine2, city, state, zip } = req.body.data;
            if (!name || !addressLine1 || !addressLine2 || !city || !state || !zip) {
                res.status(403).json({ successful: false, message: "missing details" });
            }
            if (!userId) {
                res.status(403).json({ successful: false, message: "token validation falied" });
            }
            const address = { userId, name, addressLine1, addressLine2, city, state, zip };
            const newAddress = new Address({
                userId: userId,
                items: [address]
            });
            await newAddress.save();
            res.status(201).json({ successful: true, message: "New Address added successfully" });
        }
        else {
            const { name, addressLine1, addressLine2, city, state, zip } = req.body.data;
            if (!name || !addressLine1 || !addressLine2 || !city || !state || !zip) {
                res.status(403).json({ successful: false, message: "missing details" });
            }
            if (!userId) {
                res.status(403).json({ successful: false, message: "token validation falied" });
            }
            const address = { name, addressLine1, addressLine2, city, state, zip };
            addressSchema.items.push(address);
            await addressSchema.save();
            res.status(201).json({ successful: true, message: "New Address added successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(403).json({ successful: false, message: "Technical error" });

    }
}

module.exports = {
    accountView,
    addressView,
    addAddress
}