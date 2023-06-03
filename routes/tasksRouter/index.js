const express = require('express');
const router = express.Router();
const { EMPTYHANDLER } = require('../TODOhandler');

router.get('/tasks', EMPTYHANDLER);
router.post('/tasks', EMPTYHANDLER);
router.patch('/tasks/:taskID', EMPTYHANDLER);
router.delete('/tasks/:taskID', EMPTYHANDLER);

module.exports = { router }