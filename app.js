const express = require('express');

const sequelize = require('./config/database')
const router = require('./routes/productRoutes.js')
const router1 = require('./routes/cartRoutes.js')
const Cart = require('./model/cartModel');
const Product = require('./model/productModel');
const User = require('./model/userModel');
const CartItem = require('./model/cartItem');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            console.log(req.user)
            next();
        })
        .catch((err) => {
            console.log(err);
        })
})

app.use('/products', router)
app.use('/cart', router1)

app.get('/', (req, res) => {
    res.render('layouts/main');
})


const PORT = process.env.PORT || 5000;
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
Product.hasMany(Cart); 
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
sequelize.sync()
    .then((result) => {
        // find a default user
        return User.findByPk(1);
    })
    .then(user => {
        // if no default user is found create one
        if (!user) {
            return User.create({
                name: "Gunjan Vazirani",
                email: "gunjan.stegowl@gmail.com"
            });
        }
        // resolve the promise and return the user
        return Promise.resolve(user);
    })

    .then((cart) => {
        app.listen(PORT, () => {
            console.log("listening at port "+PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })
