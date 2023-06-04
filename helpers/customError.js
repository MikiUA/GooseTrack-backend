class CustomError extends Error {
    constructor(status, message) {
        super();
        this.status = status || 500;
        this.message = message || 'Internal Server Error. We should fix this soon.';
        this.name = name;
    }
}

module.exports = { CustomError };