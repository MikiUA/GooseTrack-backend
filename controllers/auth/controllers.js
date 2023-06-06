const { findUserByFilter, findUserByEmail, newUser } = require("../../models/users/users");
const { createToken, createRefreshToken, deleteToken, doRefreshToken } = require("../../models/tokens/tokens");
const { encryptPassword } = require("../../helpers/passwordEncrypter");

const login = async (req, res) => {
    const { email, password: unsafePassword } = req.body;
    //TODO: validate input fields with joi
    if (typeof (email) !== 'string' || typeof (unsafePassword) !== 'string') return res.status(400).send({ message: "missing required email or password fields" })
    const password = encryptPassword(unsafePassword);
    const user = await findUserByFilter({ email, password });
    if (!user) return res.status(401).send({ message: "incorrect email or password" });
    const token = createToken(user._id);
    const refreshToken = await createRefreshToken(user._id);
    console.log({ token, refreshToken });
    return res.status(200).send({ token, refreshToken, user })
}

const register = async (req, res) => {
    const { name, email, password: unsafePassword } = req.body;
    //TODO: validate input fields with joi
    if (typeof (email) !== 'string' || typeof (unsafePassword) !== 'string' || typeof (name) !== 'string') return res.status(400).send({ message: "missing required name, email or password fields" })
    const password = encryptPassword(unsafePassword);
    if (await findUserByEmail(email)) return res.status(409).send({ message: "Email is already used" })
    const user = await newUser({ name, email, password });
    // console.log(user);
    if (!user) return res.status(500).send({ message: "Server Error" })
    const token = createToken(user._id);
    const refreshToken = await createRefreshToken(user._id);
    return res.status(200).send({ token, refreshToken, user })
}

// const verifyEmail= async (req,res)=>{
//     try{
//     const {token}=req.query;
//     if (!token) throw 400
//     const verifiedUser = await verifyUserEmail(token);
//     if (!verifiedUser) throw 404
//     return res.status(200).send(`Verification complete! Welcome, ${verifiedUser.email}`);
//     }
//     catch (err) {
//         if (err===400) return res.status(400).send({message:"please send a valid verification token with your request"})//supposably a request using some programmable interface, like a react app or postman, sending a json
//         if (err===404) return res.status(404).send("Link is not valid")//supposedly clickable link from email, sending plaintext
//         res.sendStatus(500);
//     }
// }
// const resendEmail=async (req,res)=>{
//     try{
//     const {email}=req.body;
//     if (!email) throw 400
//     const user = await findFullUserByFilter({email})
//     if (!user) throw 404;
//     const {verified,verificationToken}=user;
//     if (verified && !verificationToken) throw 403
//     if (!verificationToken) throw `TODO: ADD AN UNCONTROLLED EXCEPTION;`// this never should be happenning but in case of wrong scenarios we need to recreate a new verification token and update user, too much work for too rare of a case
//     const result= await sendVerificationMail({to:email,verificationToken});
//     console.log(result);
//     return res.status(200).send(`A message to ${email} has been sent. Please check your inbox.`);
//     }
//     catch (err) {
//         if (err===400 || err===404) return res.status(err).send({message:"please send a valid email address"})
//         if (err===403) return res.status(403).send({message:"The user is already verified"})
//         return res.sendStatus(500);
//     }
// }

const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const authtoken = authHeader && authHeader.split(' ')[1];
    if (!authtoken || authtoken === undefined) {
        return res.status(400).send({ message: "no logout refreshtoken provided" });
    }
    try {
        const result = await deleteToken(authtoken)
        if (!result) throw { status: 404, message: "no user found" }
        return res.status(204).send({ message: "logout success" })
    }
    catch (err) {
        return res.status(err.status || 500).send({ message: err.message || "server error" })
    }
}

const getNewToken = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const authtoken = authHeader && authHeader.split(' ')[1];
    if (!authtoken) {
        return res.status(401).send({ message: "You must provide a valid token to gain access" })
    }
    try {
        const newToken = await doRefreshToken(authtoken);
        if (!newToken) return res.status(401).send({ message: "You must provide a valid token to gain access" })
        return res.status(200).send({ token: newToken });
    }
    catch (err) {
        return res.status(err.status || 500).send({ message: err.message || "server error" })
    }
}

module.exports = { login, register, logout, getNewToken }