const express = require('express');
const router = express.Router();

const handled = require('../../helpers/errorHandler')
const { getUserController, patchUserController, deleteUserController } = require('../../controllers/users');
const { authentificateUser } = require('../../middleware');

router.get('/', authentificateUser, handled(getUserController));
router.patch('/', authentificateUser, handled(patchUserController));
router.delete('/', authentificateUser, handled(deleteUserController));

module.exports = { router }