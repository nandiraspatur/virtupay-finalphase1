const express = require('express');
const router = express.Router();
const Model = require('../models')
const getNota = require('../helper/nota')

router.use(function(req, res, next){
  if(req.session.login == true){
    next()
  }else{
    res.render('login', { message: 'Silakan Daftar/Login dulu!!', title: 'Login', session:req.session})
  }
})

router.get('/', function (req, res) {
  Model.Product.findAll().then(products=>{
    console.log(products);
    res.render('order', {products:products, title: 'Order', session:req.session})
  })
})

router.get('/pulsa', function (req, res) {
  Model.Product.findAll({where:{productType:'Pulsa'}}).then(products=>{
    console.log(products);
    res.render('order-pulsa', {products:products, title: 'Order', session:req.session})
  })
})

router.get('/pln', function (req, res) {
  Model.Product.findAll({where:{productType:'PLN Prabayar'}}).then(products=>{
    console.log(products);
    res.render('order-pln', {products:products, title: 'Order', session:req.session})
  })
})

router.get('/paketdata', function (req, res) {
  Model.Product.findAll({where:{productType:'Paket Data'}}).then(products=>{
    console.log(products);
    res.render('order-paketdata', {products:products, title: 'Order', session:req.session})
  })
})

router.post('/', function (req, res) {
    let nota;
    let newId;
    Model.Transaction.findOne({
        order: [['id', 'DESC']]
    }).then(result => {
        newNota = getNota(result.nota)
        newId = result.id + 1;

        Model.Transaction.create({
            nota: newNota
        }).then(resultInsert => {
            Model.UserProduct.create({
                TransactionId : newId,

            })
        })

    })
})

router.get('/status', function(req, res){
  res.render('transaction-status', {title: 'Status Transaksi', session:req.session})
})

module.exports = router
