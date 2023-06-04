const express = require('express');
const router = express.Router();
const { login, register, getNewToken, logout } = require('../../controllers/auth/controllers');


router.post('/login', login);
router.post('/signup', register);
router.post('/register', register);
router.get('/refreshToken', getNewToken);
router.delete('/logout', logout);

module.exports = { router }