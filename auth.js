require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
app.use(cookieParser())
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
    let token = (req.headers.cookie.split(';'))[0].split('=')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = auth;
