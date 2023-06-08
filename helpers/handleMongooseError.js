const handleMongooseError = (error, data, next) => {
    error.status = 400;
    next(new CustomError(400, 'mongoose validation Error'));
};

module.exports = handleMongooseError;