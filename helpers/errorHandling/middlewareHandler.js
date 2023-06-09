function middlewareHandler(middlewareFn) {
    return async function (req, res, next) {
        try {
            const result = await middlewareFn(req, res, next);

            if (typeof (result) === 'function' && result.name === 'next') result();
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = middlewareHandler;