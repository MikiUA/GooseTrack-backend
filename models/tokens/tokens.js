// const nanoid = (...args) => import('nanoid').then(({ nanoid }) => nanoid(...args));
const { RefreshToken } = require("../../validShemas/index")
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, TOKEN_EXPIERY_TIMER } = process.env

function createToken(_id) {
    return jwt.sign({ _id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIERY_TIMER })
}

async function createRefreshToken(_id) {
    // const token = nanoid();
    const token = jwt.sign({}, 's').split('.')[2];
    console.log(token);
    await RefreshToken.create({ token: token, userID: _id });
    return token
}

async function doRefreshToken(refreshToken) {
    const { userID } = await RefreshToken.findOne({ token: refreshToken })
    if (!userID) throw ({ status: 404, message: "Refresh token invalid" });
    return createToken(userID)
}

function deleteToken(token) {
    return RefreshToken.findOneAndDelete({ token: token });
}

function validateToken(token) {
    try {
        const { _id } = jwt.verify(token, TOKEN_SECRET);
        return _id || null;
    }
    catch {
        return null;
    }
}

module.exports = { createToken, createRefreshToken, doRefreshToken, deleteToken, validateToken }