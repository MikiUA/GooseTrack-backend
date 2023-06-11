// const { nanoid } = require("nanoid");
// const { sendVerificationMail } = require("../services/email/sendEmail");

const mongoose = require("mongoose");
const { isValidObjectId } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const { User } = require("../../mongooseSchemas/index");
const gravatar = require("gravatar");

async function findUserByFilter(filter) {
  if (!filter) return null;
  const user = User.findOne(filter, ["-password"]);
  return user;
}
function findUserByID(id) {
  if (!id) return null;
  if (!isValidObjectId(id)) id = new ObjectId(id);
  return findUserByFilter({ _id: id });
}

async function newUser({ name, email, password }) {
  try {
    // const verificationToken=nanoid();
    const avatarUrl = gravatar.url(email);
    const newUser = await User.create({
      name,
      email,
      password,
      avatarUrl /*,verificationToken*/,
    });

    if (!newUser) return null;
    newUser.password = undefined;
    // sendVerificationMail({to:email,verificationToken});
    return newUser;
  } catch (err) {
    return null;
  }
}

async function updateUser(_id, body) {
  const updatedUser = await User.findByIdAndUpdate({ _id }, body, {
    new: true,
  });
  if (!updatedUser) return null;
  updatedUser.password = undefined;
  return updatedUser;
}

async function deleteUser(_id) {
  const updatedUser = await User.findByIdAndDelete(_id);
  if (!updatedUser) return false;
  return true;
}

// async function verifyUserEmail(token){
//     const verifiedUser=await User.findOneAndUpdate({verificationToken:token},{verified:true,verificationToken:null},{new:true});
//     if (!verifiedUser) return null
//     verifiedUser.password = undefined;
//     return verifiedUser
// }

module.exports = {
  findUserByFilter,
  findUserByID,
  newUser,
  updateUser,
  deleteUser,
};
