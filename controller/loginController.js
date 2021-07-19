const loginController = {}
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../model/userModel').Users
loginController.loginpage = (req, res) => {
    res.render("login", {
        pageTitle: "Login",
        // products: products,
        path: '/'
    });
}

loginController.submit = async (req, res) => {
    let password = req.body.password
    let email = req.body.email
    const foundUser = await User.findOne({ email: email, password: password });
    if (!foundUser) {
        res.send({ message: 'not registered' })
    }
    else {
        const user = { 'email': email, 'password': password }
        jwt.sign({ user }, 'secretKey', (err, token) => {
            res.send({
                token: token,
                message: "successfully logged in"
            })
            //console.log(foundUser)
        })
    }
}
module.exports = loginController