const express = require('express');
const router = require('./routes/productRoutes.js')
const router1 = require('./routes/cartRoutes.js')

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
const pug=require('pug');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', router)
app.use('/cart', router1)

app.get('/', (req, res) => {
    res.render('layouts/main');
})
const port = 5000

app.listen(port, (err) => {
    if (err) throw err;
    console.log('server on port:' + port)
})