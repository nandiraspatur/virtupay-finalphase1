const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    res.render('index', { title: 'Welcome' })
})

module.exports = router;