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
        res.status(401).send({ message: "please authorise with a valid token to access this function" })
    }
}

module.exports = authentificateUser;