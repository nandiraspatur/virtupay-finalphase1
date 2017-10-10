const crypto = require('crypto')
module.exports = function (password, secret) {
    algorithm = 'aes-256-ctr';

    var cipher = crypto.createCipher(algorithm, secret)
    var crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}