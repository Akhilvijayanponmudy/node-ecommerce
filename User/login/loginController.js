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
        const trimmedPassword = password.trim();
        const trimmedPasswordDb = user.password.trim();
        const isMatch = await bcrypt.compare(trimmedPassword, trimmedPasswordDb);

        if (!isMatch) {
            console.log("Password comparison failed.");
            return res.status(233).json({ message: 'Invalid Password' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' });

        res.json({ token });
    } catch (error) {
        console.error("Error in login validation:", error);
        res.status(234).json({ message: 'Server error' });
    }
}

module.exports = {
    loginForm,
    loginValidate,
};
