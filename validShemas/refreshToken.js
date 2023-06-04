const { Schema, model } = require('mongoose');

const token = new Schema({
    token: {
        type: String,
        required: [true, 'Token is required'],
        unique: true,
    },
    userID: {
        type: String,
        required: [true, 'userID is required'],
    },
});

const Token = model('tokens', token);
module.exports = Token;