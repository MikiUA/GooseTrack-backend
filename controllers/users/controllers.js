const { CustomError } = require("../../helpers/customError");
const { findUserByID, updateUser, deleteUser } = require("../../models/users");

const getUser = async (req, res) => {
    const user = await findUserByID(req.user);
    if (!user) throw new CustomError(404, "User not found");
    res.status(200).json(user);
}

const patchUser = async (req, res) => {
    const newUser = await updateUser(req.user, req.body);
    if (!newUser) throw new CustomError(404, "User not found");
    res.status(200).json(newUser)
}

const deleteUserController = async (req, res) => {
    const success = await deleteUser(req.user);
    if (!success) throw new CustomError(404, "User not found");
    res.status(200).send({ message: 'success' });
}

module.exports = { getUser, patchUser, deleteUser: deleteUserController }