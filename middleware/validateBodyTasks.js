const {CustomError} = require("../helpers");

const validateBodyTasks = schema => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(new CustomError(400,error.message));
        }
        next()
    }

    return func;
}

module.exports = validateBodyTasks;