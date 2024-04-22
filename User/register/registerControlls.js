const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

const userRegistration = async (req, res) => {

    const { username, fullname, password } = req.body;
    const email = username;

    if (!email && !password && !fullname) {
        return res.status(250).json({ successful: false, message: 'Username and Password Required' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(277).json({ successful: false, message: 'Email address already in use' });
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // const trimmedPassword=password.trim();
        // const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

       
        const newUser = new User({ username: fullname, email: email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ successful: true, message: 'User Created Successfully'});
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern.username) {
            res.status(233).json({ successful: false, message: 'Username already exists' });
        } else if (error.code === 11000 && error.keyPattern.email) {
            res.status(233).json({ successful: false, message: 'Email already exists' });
        } else {
            res.status(234).json({ successful: false, message: 'Error saving user to the database', error: error });
        }
    }
};

module.exports = { userRegistration };
