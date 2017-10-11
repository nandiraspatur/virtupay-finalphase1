const express = require('express');
const router = express.Router();
const Model = require('../models')
const crypto = require('crypto');
const session = require('express-session');
const getSecret = require('../helper/secret')
const getEncrypt = require('../helper/encrypt')

router.get('/', function (req, res) {
    res.render('login', { title: 'Login', message: '' })
})

router.post('/', function (req, res) {
    let password = req.body.password
    Model.User.findOne({
        where: {
            username: req.body.username
        }
    }).then((result) => {
        let salt = result.salt;
        let newPassword = getEncrypt(password, salt);
        if (result.password == newPassword) {
            req.session.login = true;
            req.session.role = result.role;
            res.redirect('/')
        } else {
            res.render('login', { message: 'Username / password is incorrect', title: 'Login' })
        }
    }).catch((reason) => {
        res.render('login', { message: 'Username / password is incorrect', title: 'Login' })
    })
})

router.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('../login');
})

module.exports = router;
