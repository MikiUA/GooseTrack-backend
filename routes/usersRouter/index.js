const express = require('express');
const router = express.Router();

const handled = require('../../helpers/errorHandler')
const { getUserController, patchUserController, deleteUserController } = require('../../controllers/users');
const { authentificateUser } = require('../../middleware');

router.get('/:userID', handled(getUserController));
router.patch('/:userID', authentificateUser, handled(patchUserController));
router.delete('/:userID', authentificateUser, handled(deleteUserController));

module.exports = { router }