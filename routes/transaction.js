const express = require('express');
const router = express.Router();
const Model = require('../models')
const getNota = require('../helper/nota')

router.get('/', function (req, res) {
  Model.Transaction.findAll({
    include: [{
      model: Model.UserProduct,
      where: {
        UserId: req.session.userId
      }
    }]
  }).then(products => {

    res.render('order', { products: products, title: 'Order', userId: req.session.userId })
  })
})

router.get('/pulsa', function (req, res) {
  Model.Product.findAll({ where: { productType: 'Pulsa' } }).then(products => {
    console.log(products);
    res.render('order-pulsa', { products: products, title: 'Order', userId: req.session.userId })
  })
})

router.get('/pln', function (req, res) {
  Model.Product.findAll({ where: { productType: 'PLN Prabayar' } }).then(products => {
    console.log(products);
    res.render('order-pln', { products: products, title: 'Order', userId: req.session.userId })
  })
})

router.get('/paketdata', function (req, res) {
  Model.Product.findAll({ where: { productType: 'Paket Data' } }).then(products => {
    console.log(products);
    res.render('order-paketdata', { products: products, title: 'Order', userId: req.session.userId })
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
      nota: newNota,
      status: "process"
    }).then(resultInsert => {
      Model.Product.findOne({
        where: {
          id: req.body.product
        }
      }).then(getTotal => {
        Model.Transaction.update({
          total: getTotal.price
        }, {
            where: {
              id: newId
            }
          })
      }).then(updatePrice => {
        Model.UserProduct.create({
          TransactionId: newId,
          UserId: req.session.userId,
          ProductId: req.body.product,
          phone: req.body.nohp
        })
      }).then(finalResul => {
        res.redirect('../../transactions')
      })
    })

  })
})


module.exports = router  
