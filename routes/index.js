const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    res.render('index', { title: 'Welcome', session: req.session})
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/');
})

router.get('/contacts', function (req, res) {
  res.render('contact', { title: 'Kontak', session: req.session})
})

function checkAccess(req, res, next){
  if(req.session.login){
    next()
  }else{
    res.render('login', { message: 'Silakan Daftar/Login dulu!!', title: 'Login', session:req.session})
  }
}

router.get('/dashboard', checkAccess, function (req, res) {
  res.redirect('/profile')
})

router.get('/profile', checkAccess, function (req, res) {
    Model.User.findOne({where:{id:req.session.userId}}).then(user=>{
      console.log(user);
      res.render('profile', {user: user, title: 'Profil', session: req.session})
    })
})


module.exports = router;
