const express = require('express');
const router = express.Router();
const Model = require('../models')
const crypto = require('crypto');
const getSecret = require('../helper/secret')

router.get('/', function (req, res) {
    res.render('login', { title: 'Welcome' })
})

module.exports = router;
