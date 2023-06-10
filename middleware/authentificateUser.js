const { UnauthorisedError } = require("../helpers/errorHandling");
const { validateToken } = require("../models/tokens/tokens");

const authentificateUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const authtoken = authHeader && authHeader.split(' ')[1];
        if (!authtoken || authtoken === undefined) throw 0;
        const userID = validateToken(authtoken);
        if (!userID) throw 0;
        req.user = userID;
        next();
    }
    catch {
        next(new UnauthorisedError())
    }
}

module.exports = authentificateUser;