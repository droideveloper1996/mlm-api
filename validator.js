const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
module.exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(400).json({ message: 'Access Denied', status: 400 });

    try {
        var info = jwt.verify(token, process.env.SECRET_KEY, (error, data));
        if (error) {

            return res.status(400).json({ status: 400, message: error.message });
        } else {
            req.user = data;
            next();
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message, status: 400 });
    }


}
