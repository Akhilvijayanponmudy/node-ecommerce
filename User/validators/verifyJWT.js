const jwt = require('jsonwebtoken'); // For JWTs


const verifyJWT = (req, res, next) => {
    if (req.method == 'POST') {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(299).json({ 'status': false, message: 'Unauthorized' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error('JWT verification error:', error.message);
            res.status(299).json({ 'status': false, message: 'Unauthorized' });
        }
    } else if (req.method == 'GET') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(299).json({ 'status': false, message: 'Unauthorized' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error('JWT verification error:', error.message);
            res.status(299).json({ 'status': false, message: 'Unauthorized' });
        }
    }
};

module.exports = verifyJWT;