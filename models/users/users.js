// const { nanoid } = require("nanoid");
// const { sendVerificationMail } = require("../services/email/sendEmail");

const { User } = require("../../validShemas/index");
const gravatar = require("gravatar");

function findUserByEmail(email) {
    return User.findOne({ email: email }, ['-password'])
}
function findUserByID(_id) {
    return User.findOne({ _id: _id }, ['-password'])
}
async function findUserByFilter(filter = {}) {
    return User.findOne(filter, ['-password']);
}

async function newUser({ name, email, password }) {
    try {
        // const verificationToken=nanoid();
        const avatarUrl = gravatar.url(email);
        const newUser = await User.create({ name, email, password, avatarUrl/*,verificationToken*/ });
        if (!newUser) return null
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
    const { password, ...rest } = updatedUser
    return rest
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