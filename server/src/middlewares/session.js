const { verifyToken } = require('../services/token');

const session = () => {
    return (req, res, next) => {
        const token = req.headers['x-authorization'];
        if (token) {
            try {
                const decoded = verifyToken(token);
                req.user = decoded;
            } catch (error) {
                res.status(401).json({code:401, message: 'Invalid token!'});
                return;
            }
        }
        next();
    };
}

module.exports = { session };