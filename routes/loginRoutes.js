const express = require('express');
const loginrouter = express.Router();
const loginController = require('../controller/loginController');
loginrouter.get('/',loginController.loginpage)
loginrouter.post('/submit',loginController.submit)
loginrouter.post('/logout',loginController.logout)
module.exports = loginrouter