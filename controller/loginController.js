const loginController = {}
const handleErrors = (err) => {

    let errors = { name: '', email: '', password: '' }
    if (err.code === 11000) {
        errors.email = 'User Already registered'
        return errors;
    }
    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
const auth = require('../auth')
const mongoose = require('mongoose')
const User = require('../model/userModel').Users

//controller to render login user
loginController.loginpage = (req, res) => {
    res.render("login", {
        pageTitle: "Login",
        // products: products,
        path: '/'
    });
}

//controller to render signup page
loginController.signUp = (req, res) => {
    res.render("signUp", {
        pageTitle: "SignUp",
        path: '/'
    });
}

//controller for signup user
loginController.signUser = async (req, res) => {
    let { name, email, password } = req.body
    try {
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        //res.status(201).send({ msg: 'success' })
        res.redirect('/login')

    }

    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json(errors)
    }
}

//controller for login button
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
        res.cookie('x-access-token', accessToken, { httpOnly: true });
        res.cookie('refresh', refreshToken, { httpOnly: true });
        console.log('a' + accessToken)

        console.log(req.headers.cookie)
        res.redirect('/products');

    }
}

//controller for logout button
loginController.logout = async (req, res) => {
    const refreshToken = (req.headers.cookie.split(';'))[1].split('=')[1]
    console.log(refreshToken)
    user = await User.findOne({
        refreshToken: refreshToken
    })
    user.set({ refreshToken: null })
    user.save()
    res.redirect('/login')
}

module.exports = loginController
