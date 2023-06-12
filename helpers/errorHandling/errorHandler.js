const errorHandler = (err, req, res, next) => {
    if (err.name === 'CustomError') {
        res.status(err.status).send({
            status: 'error',
            code: err.status,
            message: err.message
        })
        return
    }
    console.log(err);
    res.status(500).send({
        status: 'error',
        message: err.message || "Internal Server Error. Sorry for inconvenience",
    });
};

module.exports = errorHandler;