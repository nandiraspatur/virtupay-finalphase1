const express = require('express');
const app = express();

const bodyParser = require('body-parser')

app.use(express.static('./public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index = require('./routes/index');
const user = require('./routes/user');
const product = require('./routes/product');
const transaction = require('./routes/transaction');

app.use('/', index);
app.use('/users', user);
app.use('/products', product);
app.use('/transactions', transaction);

app.listen(process.env.PORT || '3000', () => {
  console.log('Listening port 3000');
})
