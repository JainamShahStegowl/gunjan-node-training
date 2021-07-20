require('dotenv').config()
const express = require('express');
const router = require('./routes/productRoutes.js')
const router1 = require('./routes/cartRoutes.js')
const loginrouter = require('./routes/loginRoutes.js')
const User = require('./model/userModel').Users;
const app = express();
const path = require('path');
const mongoose = require('mongoose')

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', error => {
    console.error('Error in MongoDb connection: ' + error);
})
db.on('connected', () => console.log('Data Db connected'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    const query = User.where({ '_id': '60f6b3d9b052b821a865e303' })
    query.findOne()
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        })
})

app.use('/products', router)
app.use('/cart', router1)
app.use('/login', loginrouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listening at port " + PORT);
});

