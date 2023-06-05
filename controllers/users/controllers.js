const { CustomError } = require("../../helpers/customError");
const { findUserByID, updateUser } = require("../../models/users");

const getUser = async (req, res) => {
    const user = await findUserByID(req.user);
    if (!user) throw new CustomError(404, "User not found");
    res.status(200).send({ ...user })
}

const patchUser = async (req, res) => {
    const newUser = await updateUser(req.user, req.body);
    if (!newUser) throw new CustomError(404, "User not found");
    res.status(200).send({ ...newUser })
}

const deleteUser = async (req, res) => {
    const success = await deleteUser(req.user);
    if (!success) throw new CustomError(404, "User not found");
    res.status(200).send({ ...newUser })
}

module.exports = { getUser, patchUser, deleteUser }