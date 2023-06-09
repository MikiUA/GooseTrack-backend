const nanoid = import('nanoid');
const { CustomError } = require('../../helpers/errorHandling');
const { RefreshToken } = require("../../mongooseSchemas/index")
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, TOKEN_EXPIERY_TIMER } = process.env

function createToken(_id) {
    return jwt.sign({ _id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIERY_TIMER })
}

async function createRefreshToken(_id) {
    const token = (await nanoid).nanoid(50);
    await RefreshToken.create({ token: token, userID: _id });
    return token
}

async function doRefreshToken(refreshToken) {
    const token = await RefreshToken.findOne({ token: refreshToken })
    if (!token) throw new CustomError(404, "Refresh token invalid");
    return { userid: token.userID, token: createToken(token.userID) }
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