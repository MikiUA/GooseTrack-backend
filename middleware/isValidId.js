const { isValidObjectId } = require("mongoose");

const { ValidationError } = require("../helpers/errorHandling");

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(new ValidationError(`${id} is not valid id`))
    }
    next();
}

module.exports = isValidId;