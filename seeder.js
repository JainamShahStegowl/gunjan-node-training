require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

let Users = require('./model/userModel').Users

async function createUser() {
    const user = await Users.find({ "name": "user" })
    if (user.length < 1) {
        const user = new Users({
            "name": "user",
            "email": "user@gmail.com"
        })
        await user.save()
    }
    mongoose.disconnect()
}
createUser()