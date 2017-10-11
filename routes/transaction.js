const express = require('express');
const router = express.Router();
const Model = require('../models')
const getNota = require('../helper/nota')

router.get('/', function (req, res) {
  Model.Product.findAll().then(products=>{
    console.log(products);
    res.render('order', {products:products, title: 'Order' })
  })
})

router.get('/pulsa', function (req, res) {
  Model.Product.findAll({where:{productType:'Pulsa'}}).then(products=>{
    console.log(products);
    res.render('order-pulsa', {products:products, title: 'Order' })
  })
})

router.get('/pln', function (req, res) {
  Model.Product.findAll({where:{productType:'PLN Prabayar'}}).then(products=>{
    console.log(products);
    res.render('order-pln', {products:products, title: 'Order' })
  })
})

router.get('/paketdata', function (req, res) {
  Model.Product.findAll({where:{productType:'Paket Data'}}).then(products=>{
    console.log(products);
    res.render('order-paketdata', {products:products, title: 'Order' })
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


module.exports = router  
