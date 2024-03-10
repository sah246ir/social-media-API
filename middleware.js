// token verification

const jwt = require('jsonwebtoken');
const User = require('./models/User'); 
async function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'Access denied! Please log in again' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = await User.findById(decoded.userId);
        if (!req.user) return res.status(403).json({ error: 'User does not exist! Please log in again' });
        next();

    } catch (error) {
        return res.status(403).json({ error: 'Invalid token! Please log in again' });
    }
};

module.exports = {verifyToken};