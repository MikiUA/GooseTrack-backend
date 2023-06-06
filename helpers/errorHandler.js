const wrapper = fn => async (req, res, next) => {
    try {
        const result = await fn(req, res, next);
        return result;
    } catch (error) {
        switch (error.name) {
            case 'ValidationError':
                res
                    .status(400)
                    .send({ status: 'error', code: 400, message: error.message });
                break;
            case 'CustomError':
                res.status(error.status).send({
                    status: 'error',
                    code: error.status,
                    message: error.message,
                });
                break;
            default:
                console.log(error);
                res.status(500).send({
                    status: 'error',
                    message: "Internal Server Error. Sorry for inconvenience",
                });
        }
    }
};

module.exports = wrapper;