const jwt = require('jsonwebtoken'); // For JWTs


const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to the request
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = verifyJWT;