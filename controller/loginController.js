const loginController = {}
const jwt=require('jsonwebtoken')
loginController.loginpage = (req, res) => {
    res.render("login", {
        pageTitle: "Login",
        // products: products,
        path: '/'
    });
}

loginController.submit = (req, res) => {
    let username = req.body.username
    let password = req.body.password
    const  user={ 'username': username, 'email': password }
    jwt.sign({ user }, 'secretKey', (err, token) => {
        res.json({
            token
        })
    })
}
module.exports = loginController