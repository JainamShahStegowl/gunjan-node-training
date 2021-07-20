const loginController = {}
const auth = require('../auth')
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
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
        res.send({ message: 'User not registered' })
    }
    if (foundUser.password != password) {
        res.send({ message: 'EmailId or password incorrect' })
    }
    else {
        const user = { 'email': email, 'password': password }
        accessToken = auth.generateToken(user)
        refreshToken = auth.generateRefreshToken(user)

        //saving refreshToken in db
        await foundUser.set({
            refreshToken: refreshToken
        })
        foundUser.save()
        token = {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
        res.send(token)
    }


}

loginController.logout = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log()
    user = await User.findOne({
        refreshToken: refreshToken
    })
    console.log(user)
    user.set({refreshToken:null})
    user.save()
    res.json({
        msg: "success"
    });
}
module.exports = loginController
