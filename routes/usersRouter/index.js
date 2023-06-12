const express = require("express");
const router = express.Router();

const { middlewareHandler: handled } = require("../../helpers/errorHandling");
const {
  getUserController,
  patchUserController,
  deleteUserController,
  updateAvatar,
} = require("../../controllers/users");
const { authentificateUser } = require("../../middleware");
const upload = require("../../middleware/uploadAvatar");

router.get("/", authentificateUser, handled(getUserController));
router.patch("/", authentificateUser, handled(patchUserController));
router.delete("/", authentificateUser, handled(deleteUserController));
router.patch(
  "/avatar",
  authentificateUser,
  handled(upload.single("avatar")),
  handled(updateAvatar)
);

module.exports = { router };
