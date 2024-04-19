const jwt = require('jsonwebtoken'); // For JWTs
const User = require('../../models/userModel'); // Import User model
const bcrypt = require('bcryptjs');

const loginForm = (req, res) => {
    res.send('loginform');
}

const loginValidate = async (req, res) => {
    const { email, password } = req.body;
    // 1. Validate email and password presence
    if (!email || !password) {
        return res.status(233).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(233).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        if (!isMatch) {
            console.log("Password comparison failed.");
            return res.status(233).json({ message: 'Invalid Password' });
        }

        // 4. Generate JWT (on successful login)
        const payload = { userId: user._id }; // Include user ID in payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' }); // Set expiry time

        res.json({ token }); // Send the JWT in the response
    } catch (error) {
        console.error("Error in login validation:", error);
        res.status(234).json({ message: 'Server error' });
    }
}

module.exports = {
    loginForm,
    loginValidate,
};
