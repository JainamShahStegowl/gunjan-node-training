const express = require('express');
const loginrouter = express.Router();
const loginController = require('../controller/loginController');
loginrouter.get('/',loginController.loginpage)
loginrouter.post('/submit',loginController.submit)
module.exports = loginrouter