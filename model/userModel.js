const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: { type: String, required: true, immutable:true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

const Users = mongoose.model('users', UserSchema)

module.exports = { "Users": Users }
