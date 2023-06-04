const { CustomError } = require("../../helpers/customError");
const { findUserByID, updateUser } = require("../../models/users");

const getUser = async (req, res) => {
    const { userID } = req.params;
    const user = await findUserByID(userID);
    if (!user) throw new CustomError(404, "User not found");
    res.status(200).send({ ...user })
}

const patchUser = async (req, res) => {
    const { userID } = req.params;
    const newUser = await updateUser(userID, req.body);
    if (!newUser) throw new CustomError(404, "User not found");
    res.status(200).send({ ...newUser })
}

const deleteUser = async (req, res) => {
    const { userID } = req.params;
    const success = await deleteUser(userID);
    if (!success) throw new CustomError(404, "User not found");
    res.status(200).send({ ...newUser })
}

module.exports = { getUser, patchUser, deleteUser }