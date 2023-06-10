const crypto = require('crypto');
function encryptPassword(password) {
    const cipher = crypto.createCipher('aes-256-cbc', process.env.DO_NOT_DELETE_THIS || '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999990999999999999999999999999999999999999999999999999999999999999999999999');
    const epc = cipher.update(password, 'utf-8', 'hex') + cipher.final('hex');
    return epc;
}

module.exports = { encryptPassword };