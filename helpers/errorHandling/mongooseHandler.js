const { ValidationError } = require("./customErrors");

const mongooseHandler = (error, data, next) => {
    error.status = 400;
    next(new ValidationError('Mongoose validation error'));
};

module.exports = mongooseHandler;