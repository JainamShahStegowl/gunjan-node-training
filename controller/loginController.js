const loginController = {}
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
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

//controller for login button
loginController.submit = async (req, res) => {
    let password = req.body.password
    let email = req.body.email
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser)
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
    }
    localStorage.setItem('accessToken', 'Bearer ' + accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    //  access=localStorage.getItem('accessToken')
    //console.log(access)
    res.redirect('/products');
}

//controller for logout button
loginController.logout = async (req, res) => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log()
    user = await User.findOne({
        refreshToken: refreshToken
    })
    console.log(user)
    user.set({ refreshToken: null })
    user.save()
    res.send({
        msg: "success"
    });
}

module.exports = loginController
