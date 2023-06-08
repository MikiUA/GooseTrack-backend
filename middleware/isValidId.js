const {isValidObjectId} = require("mongoose");

const {CustomError} = require("../helpers");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(CustomError(400, `${id} is not valid id`))
    }
    next();
}

module.exports = isValidId;