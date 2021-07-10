const express = require('express');

const sequelize = require('./config/database')
const router = require('./routes/productRoutes.js')
const router1 = require('./routes/cartRoutes.js')
const Cart = require('./model/cartModel');
const Product = require('./model/productModel');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', router)
app.use('/cart', router1)

app.get('/', (req, res) => {
    res.render('layouts/main');
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('server on port:' + PORT)
})
Product.hasMany(Cart); 
Cart.belongsTo(Product); 
sequelize.sync()
