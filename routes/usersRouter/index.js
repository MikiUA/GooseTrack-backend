const express = require('express');
const router = express.Router();
const { EMPTYHANDLER } = require('../TODOhandler');

router.get('/:userID', EMPTYHANDLER);
router.patch('/:userID', EMPTYHANDLER);
router.delete('/:userID', EMPTYHANDLER);

module.exports = { router }