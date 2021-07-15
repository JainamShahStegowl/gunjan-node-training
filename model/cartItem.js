const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = Schema({
    quantity: {type: String, required: true ,immutable: true},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    cartId: { type: Schema.Types.ObjectId, ref: 'carts', immutable: true },
    ProductId: { type: Schema.Types.ObjectId, ref: 'products', immutable: true },
});

const CartItems = mongoose.model('cartItems', CartItemSchema)

module.exports = { "CartItems": CartItems }
