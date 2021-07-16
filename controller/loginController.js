const loginController = {}


loginController.loginpage=(req,res)=>{
    res.render("login", {
        pageTitle: "Login",
        // products: products,
        path: '/'
    });
}

module.exports = loginController