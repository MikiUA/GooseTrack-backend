const express = require('express');
const router = express.Router();
const { EMPTYHANDLER } = require('../TODOhandler');

router.get('/reviews', EMPTYHANDLER);
router.get('/my-reviews', EMPTYHANDLER);
router.post('/my-reviews', EMPTYHANDLER);
router.patch('/:reviewID', EMPTYHANDLER);
router.delete('/:reviewID', EMPTYHANDLER);

module.exports = { router }