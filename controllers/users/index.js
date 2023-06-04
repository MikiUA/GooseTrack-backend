const { getUser, patchUser, deleteUser } = require('./controllers')

module.exports = {
    getUserController: getUser,
    patchUserController: patchUser,
    deleteUserController: deleteUser
}