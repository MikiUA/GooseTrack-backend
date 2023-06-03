const express = require('express');
const router = express.Router();

const EMPTYHANDLER = (req, res) => { res.sendStatus(501) };

router.post('auth/login', EMPTYHANDLER);
router.post('auth/signup', EMPTYHANDLER);

router.get('/auth/refreshToken', EMPTYHANDLER);
router.delete('/auth/logout', EMPTYHANDLER);

router.get('/user/:userID', EMPTYHANDLER);
router.patch('/user/:userID', EMPTYHANDLER);
router.delete('/user/:userID', EMPTYHANDLER);

router.get('/reviews', EMPTYHANDLER);
router.get('/reviews/my-reviews', EMPTYHANDLER);
router.post('/reviews/my-reviews', EMPTYHANDLER);
router.patch('/reviews/:reviewID', EMPTYHANDLER);
router.delete('reviews/:reviewID', EMPTYHANDLER);

router.get('/tasks', EMPTYHANDLER);
router.post('/tasks', EMPTYHANDLER);
router.patch('/tasks/:taskID', EMPTYHANDLER);
router.delete('/tasks/:taskID', EMPTYHANDLER);

module.exports = { router }