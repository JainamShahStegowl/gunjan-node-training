require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

auth = {}

auth.generateToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60s'
    })
}

auth.generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

auth.authorization = (req, res, next) => {
    token = req.cookie('x-access-token')
    // let token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    token = token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = auth;
