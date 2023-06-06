const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRouter/index').router);
router.use('/users', require('./usersRouter/index').router);
router.use('/reviews', require('./reviewsRouter/index').router);
router.use('/tasks', require('./tasksRouter/index').router);

module.exports = { router }