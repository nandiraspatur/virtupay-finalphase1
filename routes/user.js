const express = require('express');
const router = express.Router();
const Model = require('../models')
const crypto = require('crypto');
const getSecret = require('../helper/secret')
const getEncrypt = require('../helper/encrypt')
const getDecrypt = require('../helper/decrypt')

function allowSignUp(req, res, next){
  if(!req.session.login || req.session.role == 'admin'){
    next()
  }else{
    res.redirect('/dashboard')
  }
}

router.get('/signup', allowSignUp, function (req, res) {
  res.render('user-add', { title: 'Add Data User', session: req.session})
})

router.post('/signup', allowSignUp, function (req, res) {
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
    if(req.session.role == 'admin'){
      res.redirect('/users')
    }else{
      res.render('login', { message: 'Anda telah terdaftar, silahkan login menggunakan password dan username Anda!', title: 'Welcome', session:req.session})
    }
  })

})

function checkAccess(req, res, next){
  if(req.session.role == 'admin'){
    next()
  }else if(req.session.login == true){
    res.redirect('/profile')
  }else{
    res.redirect('/dashboard')
  }
}

router.use(function(req, res, next){
  if(req.session.login == true){
    next()
  }else{
    res.render('login', { message: 'Silakan Daftar/Login dulu!!', title: 'Login', session:req.session})
  }
})


router.get('/edit/:id', function (req, res) {
  let passwordEncrypt;
  let passwordDecrypt;

  Model.User.findById(req.params.id).then((result) => {

    passwordEncrypt = result.password;
    passwordDecrypt = getDecrypt(passwordEncrypt, result.salt)
    result.password = passwordDecrypt;
    res.render('user-edit', { dataUser: result, title: 'Edit Data User', session:req.session})
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

router.use('/', checkAccess, function (req, res, next) {
    if (req.session.role == 'admin' || req.session.role == 'customer') {
        next()

    } else {
        res.redirect('/login')
    }
})
router.get('/', checkAccess, function (req, res) {
    Model.User.findAll().then((result) => {
        res.render('user', { dataUser: result, title: 'Data User', session: req.session })
    })
})


router.get('/delete/:id', checkAccess, function (req, res) {
    Model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.redirect('../../users')
    })

})

module.exports = router
