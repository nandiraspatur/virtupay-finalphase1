const express = require('express');
const router = express.Router();
const Model = require('../models')
const getNota = require('../helper/nota')

// router.get('/', function (req, res) {
//     res.render('userproduct', { title: 'User Product' })

// })
router.get('/:id', function (req, res) {
    res.render('userproduct', { title: "Transaction", userId: req.session.userId })
})
router.post('/:id', function (req, res) {
    console.log(req.params.id)
    // let nota;
    // let newId;
    // Model.Transaction.findOne({
    //     order: [['id', 'DESC']]
    // }).then(result => {
    //     newNota = getNota(result.nota)
    //     newId = result.id + 1;
    //     Model.Transaction.create({
    //         nota: newNota
    //     }).then(resultInsert => {
    //         Model.UserProduct.create({
    //             TransactionId: newId,
    //             UserId: req.params.id,
    //             ProductId: req.body.product
    //         })
    //     }).then(resultUserProduct => {
    //         Model.Transaction.update({
    //             total: req.body.total
    //         }, {
    //                 where: {
    //                     id: newId
    //                 }
    //             }).then(finalResult => {
    //                 res.redirect('../../transaction')
    //             })
    //     })

    // })
})


module.exports = router  