const express = require('express');
const app = express();
const session = require('express-session');

const bodyParser = require('body-parser')
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static('./public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index = require('./routes/index');
const user = require('./routes/user');
const product = require('./routes/product');
const transaction = require('./routes/transaction');
const login = require('./routes/login');
const userproduct = require('./routes/userproduct');

function authentication(req, res, next) {
  if (!req.session.login) {
    res.redirect('/login')
    return
  }
  next();
}
app.use('/', index);
app.use('/users', user);
app.use('/products', product);
app.use('/login', login);
app.use('/sales', userproduct);
app.use('/transactions', transaction);

app.listen(process.env.PORT || '3000', () => {
  console.log('Listening port 3000');
})
