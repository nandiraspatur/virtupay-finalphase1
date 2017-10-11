const express = require('express');
const router = express.Router();
const Model = require('../models')
const crypto = require('crypto');
const getSecret = require('../helper/secret')
const getEncrypt = require('../helper/encrypt')
const getDecrypt = require('../helper/decrypt')

<<<<<<< HEAD
// router.use('/', function (req, res) {
//     res.render('users', {title : ""})
// })

router.get('/', function (req, res) {
    Model.User.findAll().then((result) => {
        res.render('user', { dataUser: result, title: 'Data User' })
    })
})

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' })
})

=======
>>>>>>> origin/login-session
router.get('/signup', function (req, res) {
    res.render('user-add', { title: 'Add Data User', session: req.session.role })
})
router.post('/signup', function (req, res) {
    let password = req.body.password
    let secret = getSecret(20);
    let newPassword = getEncrypt(password, secret);
    req.session.role = req.body.role;
    Model.User.create({
        name: req.body.name,
        username: req.body.username,
        password: newPassword,
        salt: secret,
        role: req.body.role
    }).then(result => {
        res.render('login', { message: 'Anda telah terdaftar, silahkan login menggunakan password dan username Anda!', title: 'Welcome' })
    })

})

router.use('/', function (req, res, next) {
    if (req.session.role == 'admin' || req.session.role == 'customer') {
        next()

    } else {
        res.redirect('/login')
    }
})
router.get('/', function (req, res) {
    Model.User.findAll().then((result) => {
        res.render('user', { dataUser: result, title: 'Data User', session: req.session.role })
    })
})


router.get('/edit/:id', function (req, res) {
    let passwordEncrypt;
    let passwordDecrypt;

    Model.User.findById(req.params.id).then((result) => {

        passwordEncrypt = result.password;
        passwordDecrypt = getDecrypt(passwordEncrypt, result.salt)
        result.password = passwordDecrypt;
        res.render('user-edit', { dataUser: result, title: 'Edit Data User' })
    })
})

router.post('/edit/:id', function (req, res) {
    let password = req.body.password
    let secret = req.body.salt
    let newPassword = getEncrypt(password, secret);
    Model.User.update({
        name: req.body.name,
        username: req.body.username,
        password: newPassword,
        salt: secret
    }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.redirect('../../users')
        })
})

router.get('/delete/:id', function (req, res) {
    Model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.redirect('../../users')
    })

})

module.exports = router
