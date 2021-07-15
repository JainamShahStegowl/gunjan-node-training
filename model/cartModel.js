const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    ProductId: { type: Schema.Types.ObjectId, ref: 'products', immutable: true },
})
const Carts = mongoose.model('carts', CartSchema)

module.exports = { "Carts": Carts }
