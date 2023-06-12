const { CustomError } = require("../../helpers/errorHandling");
const { findUserByID, updateUser, deleteUser } = require("../../models/users");
const cloudinary = require("cloudinary");
const { User } = require("../../mongooseSchemas/index");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { error } = require("console");

cloudinary.config({
  cloud_name: "duzt9z5pw",
  api_key: "719928558936212",
  api_secret: "oZMnlLL5--SpPHCrBHIZznjme0I",
});

const getUser = async (req, res) => {
  const user = await findUserByID(req.user);
  if (!user) throw new CustomError(404, "User not found");
  res.status(200).json(user);
};

const patchUser = async (req, res) => {
  const newUser = await updateUser(req.user, req.body);
  if (!newUser) throw new CustomError(404, "User not found");
  res.status(200).json(newUser);
};

const deleteUserController = async (req, res) => {
  const success = await deleteUser(req.user);
  if (!success) throw new CustomError(404, "User not found");
  res.status(200).send({ message: "success" });
};

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const id = req.user;
  const { path: tempUpload, originalname } = req.file;

  const imageName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarDir, imageName);

  try {
    await fs.rename(tempUpload, resultUpload);

    const file = await Jimp.read(resultUpload);

    await file.resize(250, 250).write(resultUpload);

    const fileStats = await fs.stat(resultUpload);
    if (!fileStats.isFile()) {
      throw new Error("Empty file");
    }

    const uploadedImage = await cloudinary.uploader.upload(resultUpload, {
      public_id: imageName,
      folder: "avatars",
      transformation: [{ width: 250, height: 250, crop: "fill" }],
    });

    const avatarURL = uploadedImage.secure_url;

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });

    await fs.unlink(resultUpload);
  } catch (error) {
    console.log(error);
    await fs.unlink(resultUpload);
    throw error;
  }
};

module.exports = {
  updateAvatar,
  getUser,
  patchUser,
  deleteUser: deleteUserController,
};
