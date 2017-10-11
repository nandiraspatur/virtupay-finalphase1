const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', function (req, res) {
  model.Product.findAll({order: ['"provider"']}).then(products => {
    res.render('product', {products:products, title:'Produk'})
  })
})

router.get('/detail', function (req, res) {
  model.Product.findAll({order: ['"provider"']}).then(products => {
    res.render('product-public', {products:products, title:'Produk'})
  })
})

router.get('/add', function (req, res) {
  res.render('product-add', {title:'Tambah Produk'})
})

router.post('/add', function (req, res) {
  console.log(req.body);
  model.Product.create(req.body).then(products => {
    res.redirect('/products')
  })
})

router.get('/edit/:id', function (req, res) {
  model.Product.findOne({where:req.params}).then(product=>{
    console.log(product);
    res.render('product-edit', {product:product, title:'Edit Produk'})
  })
})

router.post('/edit/:id', function (req, res) {
  console.log(req.body);
  model.Product.update(req.body, {where:req.params}).then(products => {
    res.redirect('/products')
  })
})

router.get('/delete/:id', function (req, res) {
  model.Product.destroy({where:req.params}).then(product=>{
    res.redirect('/products')
  })
})

module.exports = router;
