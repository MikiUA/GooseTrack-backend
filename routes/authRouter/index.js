const express = require('express');
const router = express.Router();
const { EMPTYHANDLER } = require('../TODOhandler');

router.post('auth/login', EMPTYHANDLER);
router.post('auth/signup', EMPTYHANDLER);
router.get('/auth/refreshToken', EMPTYHANDLER);
router.delete('/auth/logout', EMPTYHANDLER);

module.exports = { router }