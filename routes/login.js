const express = require('express');
const router = express.Router();
const Model = require('../models')
const crypto = require('crypto');
const session = require('express-session');
const getSecret = require('../helper/secret')
const getEncrypt = require('../helper/encrypt')

router.get('/', function (req, res) {
    res.render('login', { title: 'Login', message: '', session:req.session})
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
            req.session.userId = result.id;
            req.session.name = result.name;
            console.log(req.session);
            res.redirect('/profile')
        } else {
            res.render('login', { message: 'Username / password is incorrect', title: 'Login', session:req.session})
        }
    }).catch((reason) => {
        res.render('login', { message: 'Username / password is incorrect', title: 'Login', session:req.session})
    })
})

module.exports = router;
