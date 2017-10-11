const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    res.render('index', { title: 'Welcome' })
})

router.get('/dashboard', function (req, res) {
    res.render('index-dashboard', { title: 'Dashboard' })
})

module.exports = router;
