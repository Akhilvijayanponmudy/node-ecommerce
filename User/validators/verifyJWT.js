const jwt = require('jsonwebtoken'); // For JWTs


const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(299).json({'status':false, message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(299).json({'status':false, message: 'Unauthorized' });
    }
};

module.exports = verifyJWT;