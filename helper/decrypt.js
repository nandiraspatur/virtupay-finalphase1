const crypto = require('crypto')
module.exports = function (password, secret) {
    algorithm = 'aes-256-ctr';

    var decipher = crypto.createDecipher(algorithm, secret)
    var dec = decipher.update(password, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
    
}