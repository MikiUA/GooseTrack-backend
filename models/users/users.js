// const { nanoid } = require("nanoid");
// const { sendVerificationMail } = require("../services/email/sendEmail");

const { User } = require("../../mongooseSchemas/index");
const gravatar = require("gravatar");


async function findUserByFilter(filter) {
    if (!filter) return null;
    const user = User.findOne(filter, ['-password']);
    return user;
}
async function findUserByEmail(email) {
    return findUserByFilter({ email });
}
async function findUserByID(_id) {
    return findUserByFilter({ _id });
}

async function newUser({ name, email, password }) {
    try {
        // const verificationToken=nanoid();
        const avatarUrl = gravatar.url(email);
        const newUser = await User.create({ name, email, password, avatarUrl/*,verificationToken*/ });

        if (!newUser) return null
        newUser.password = undefined;
        // sendVerificationMail({to:email,verificationToken});
        return newUser
    }
    catch (err) {
        return null
    }
}

async function updateUser(_id, body) {
    const updatedUser = await User.findByIdAndUpdate({ _id }, body, { new: true });
    if (!updatedUser) return null
    updatedUser.password = undefined;
    return updatedUser;
}

async function deleteUser(_id) {
    const updatedUser = await User.findByIdAndDelete(_id)
    if (!updatedUser) return false
    return true
}

// async function verifyUserEmail(token){
//     const verifiedUser=await User.findOneAndUpdate({verificationToken:token},{verified:true,verificationToken:null},{new:true});
//     if (!verifiedUser) return null
//     const {email,subscription,_id} = verifiedUser;
//     return {email,subscription,_id}
// }

module.exports = { findUserByEmail, findUserByID, findUserByFilter, newUser, updateUser, deleteUser }