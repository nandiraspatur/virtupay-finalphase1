const express = require('express');
const router = express.Router();
const Model = require('../models')

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

module.exports = router;
