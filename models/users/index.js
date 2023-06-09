const { findUserByEmail, findUserByID, findUserByFilter, newUser, updateUser, deleteUser } = require('./users')
module.exports = {
    findUserByEmail, findUserByID, findUserByFilter,
    newUser, updateUser, deleteUser
}