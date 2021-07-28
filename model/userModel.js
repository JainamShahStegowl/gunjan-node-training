const mongoose = require('mongoose');
const { isEmail } = require('validator')
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: { type: String, required: [true, 'Please enter your name'], immutable: true },
    email: { type: String, required: [true, 'Please enter your enailId'], validate: [isEmail, 'Please enter a valid Email'], unique: true },
    password: { type: String, required: [true, 'Please enter your password'], minlength: [6, 'Minimum password length is 6 characters'] },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    refreshToken: { type: String }
});

const Users = mongoose.model('users', UserSchema)

module.exports = { "Users": Users }
