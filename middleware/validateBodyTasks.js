const { ValidationError } = require("../helpers/errorHandling");

const validateBodyTasks = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(new ValidationError(error.message));
        }
        next()
    }

    return func;
}

module.exports = validateBodyTasks;