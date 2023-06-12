const {
  getUser,
  patchUser,
  deleteUser,
  updateAvatar,
} = require("./controllers");

module.exports = {
  getUserController: getUser,
  patchUserController: patchUser,
  deleteUserController: deleteUser,
  updateAvatar,
};
