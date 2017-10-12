const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    Model.User.findAll({
        include: [{
            model: Model.UserProduct,
            include: [{
                model: Model.Transaction,
                where: {
                    status: 'done'
                }
            }]
        }]
    }, {
            where: {
                role: 'customer'
            }
        }).then(result => {
            res.render('sales', { sales: result, title: 'Penjualan', session: req.session })
        })
})

router.get('/product', function (req, res) {
    Model.Product.findAll({
        include: [{
            model: Model.UserProduct,
            include: [{
                model: Model.Transaction,
                where: {
                    status: 'done'
                }
            }]
        }]
    }).then(result => {
        // res.send(JSON.stringify(result))
        res.render('sales-product', { sales: result, title: 'Penjualan', session: req.session })
    })
})

router.get('/history', function (req, res) {

    Model.Transaction.findAll({
        include: [{
            model: Model.UserProduct,
            where: {
                UserId: req.session.userId
            }
        }]
    }).then(products => {
        // res.send(JSON.stringify(products))
        res.render('history', { products: products, title: 'Order', session: req.session })
    })
})

module.exports = router
