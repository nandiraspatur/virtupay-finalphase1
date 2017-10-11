const express = require('express');
const router = express.Router();
const Model = require('../models')
const getNota = require('../helper/nota')

router.get('/', function (req, res) {
    res.render('userproduct', { title: 'User Product' })

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