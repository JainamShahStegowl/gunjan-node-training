const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    productName: { type: String, required: true},
    price: { type: String, required: true },
    quantity: { type:String, required: true},
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    UserId: { type: Schema.Types.ObjectId, ref: 'users', immutable: true },

});

const Products = mongoose.model('products', ProductSchema)

module.exports = { "Products": Products }