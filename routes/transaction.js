const express = require('express');
const router = express.Router();
const Model = require('../models')
const getNota = require('../helper/nota')

router.use(function (req, res, next) {
  if (req.session.login == true) {
    next()
  } else {
    res.render('login', { message: 'Silakan Daftar/Login dulu!!', title: 'Login', session: req.session })
  }
})

router.get('/status', function (req, res) {
<<<<<<< HEAD
  // Promise.all([
=======
  if (req.session.role == 'customer') {
>>>>>>> origin/sales
    Model.Transaction.findAll({
      include: [{
        model: Model.UserProduct,
        where: {
          UserId: req.session.userId
<<<<<<< HEAD
        },
        include: [{
          model: Model.Product
        }]
      }]
    }).then(products => {
      // res.send(products);
      // console.log(product);
      res.render('order-status', { products: products, title: 'Order', session: req.session})
    })
  // ])
=======
        }
      }]
    }).then(products => {
      res.render('order', { products: products, title: 'Order', session: req.session })
    })
  } else if (req.session.role == 'admin') {
    Model.Transaction.findAll({
      where: {
        status: 'process'
      }
    }, {
        include: [{
          model: Model.UserProduct
        }]
      }).then(products => {
        res.render('order', { products: products, title: 'Order', session: req.session })
      })
  }

>>>>>>> origin/sales
})

router.get('/pulsa', function (req, res) {
  Model.Product.findAll({ where: { productType: 'Pulsa' } }).then(products => {
    console.log(products);
    res.render('order-pulsa', { products: products, title: 'Order', session: req.session })
  })
})

router.get('/pln', function (req, res) {
  Model.Product.findAll({ where: { productType: 'PLN Prabayar' } }).then(products => {
    console.log(products);
    res.render('order-pln', { products: products, title: 'Order', session: req.session })
  })
})

router.get('/paketdata', function (req, res) {
  Model.Product.findAll({ where: { productType: 'Paket Data' } }).then(products => {
    console.log(products);
    res.render('order-paketdata', { products: products, title: 'Order', session: req.session })
  })
})

router.post('/status', function (req, res) {
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
        res.render('order-confirm', {title:'Konfirmasi Pesanan', session:req.session})
      })
    })

  })
})

router.get('/', function(req, res){
  res.redirect('/transactions/pulsa')
})

router.get('/sales', function(req, res){
  res.render('sales', {title: 'Status Transaksi', session:req.session})
router.get('/', function (req, res) {
  res.render('order-status', { title: 'Status Transaksi', session: req.session })
})

router.get('/order/confirm/:id', function (req, res) {
  Model.Transaction.update({
    status: 'done'
  }, {
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.redirect('../../../transactions/status')
    })
})

module.exports = router
