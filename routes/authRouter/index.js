const express = require('express');
const router = express.Router();
const { login, register, getNewToken, logout } = require('../../controllers/auth/controllers');
const handled = require('../../helpers/errorHandler')

router.post('/login', handled(login));
router.post('/signup', handled(register));
router.post('/register', handled(register));
router.get('/refreshToken', handled(getNewToken));
router.delete('/logout', handled(logout));

module.exports = { router }