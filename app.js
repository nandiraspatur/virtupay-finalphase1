const express = require('express');
const app = express();

const bodyParser = require('body-parser')

app.use(express.static('./public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const index = require('./routes/index');
const login = require('./routes/login');
const user = require('./routes/user');
const product = require('./routes/product');

app.use('/', index);
app.use('/users', user);
app.use('/login', login);
app.use('/products', product);

app.listen(process.env.PORT || '3000', () => {
  console.log('Listening port 3000');
})
