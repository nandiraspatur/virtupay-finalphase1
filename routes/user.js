const express = require('express');
const router = express.Router();
const Model = require('../models')
// const crypto = require('crypto');
// const getSecret = require('../helper/secret')


router.use('/', function (req, res, next) {
    res.render('user', {title : "User Data Management"})
})



module.exports = router