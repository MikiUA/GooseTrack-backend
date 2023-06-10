const { findUserByFilter, newUser, findUserByID } = require("../../models/users/users");
const { createToken, createRefreshToken, deleteToken, doRefreshToken } = require("../../models/tokens/tokens");
const { encryptPassword } = require("../../helpers/passwordEncrypter");
const { CustomError, ValidationError } = require("../../helpers/errorHandling");

const login = async (req, res) => {
    const { email, password: unsafePassword } = req.body;
    //TODO: validate input fields with joi
    if (typeof (email) !== 'string' || typeof (unsafePassword) !== 'string') throw new ValidationError("Missing required email or password fields");
    const password = encryptPassword(unsafePassword);
    const user = await findUserByFilter({ email, password });
    if (!user) throw new CustomError(404, "Incorrect email or password")
    const token = createToken(user._id);
    const refreshToken = await createRefreshToken(user._id);
    return res.status(200).send({ token, refreshToken, user })
}

const register = async (req, res) => {
    const { name, email, password: unsafePassword } = req.body;
    //TODO: validate input fields with joi
    if (typeof (email) !== 'string' || typeof (unsafePassword) !== 'string' || typeof (name) !== 'string') throw new ValidationError("Missing required name, email or password fields")
    const password = encryptPassword(unsafePassword);
    if (await findUserByFilter({ email })) return res.status(409).send({ message: "Email is already used" })
    const user = await newUser({ name, email, password });
    if (!user) throw new CustomError(500, "Can't create a user")
    const token = createToken(user._id);
    const refreshToken = await createRefreshToken(user._id);
    return res.status(200).send({ token, refreshToken, user })
}

// const verifyEmail= async (req,res)=>{
//     const {token}=req.query;
//     if (!token) throw new ValidationError();
//     const verifiedUser = await verifyUserEmail(token);
//     if (!verifiedUser) throw new CustomError(404)
//     return res.status(200).send(`Verification complete! Welcome, ${verifiedUser.email}`);
// }
// const resendEmail=async (req,res)=>{
//     const {email}=req.body;
//     if (!email) throw new ValidationError();
//     const user = await findFullUserByFilter({email})
//     if (!user) throw new CustomError(404);
//     const {verified,verificationToken}=user;
//     if (verified && !verificationToken) throw new CustomError(403,"The user is already verified")
//     if (!verificationToken) throw `TODO: ADD AN UNCONTROLLED EXCEPTION;`// this never should be happenning but in case of wrong scenarios we need to recreate a new verification token and update user, too much work for too rare of a case
//     const result= await sendVerificationMail({to:email,verificationToken});
//     return res.status(200).send(`A message to ${email} has been sent. Please check your inbox.`);
// }

const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const authtoken = authHeader && authHeader.split(' ')[1];
    if (!authtoken || authtoken === undefined) {
        throw new ValidationError("No logout refreshToken provided")
    }

    const result = await deleteToken(authtoken)
    if (!result) throw new CustomError(404, "no user found")
    return res.status(204).send({ message: "logout success" })
}

const getNewToken = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const authtoken = authHeader && authHeader.split(' ')[1];
    if (!authtoken) throw new ValidationError("You must provide a valid token to gain access")

    const { userid, token } = await doRefreshToken(authtoken);
    if (!token) return res.status(401).send({ message: "You must provide a valid token to gain access" })
    const user = await findUserByID(userid);
    return res.status(200).send({ token, user });
}

module.exports = { login, register, logout, getNewToken }