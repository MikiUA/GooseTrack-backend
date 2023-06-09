class CustomError extends Error {
    constructor(status, message) {
        super();
        this.status = (typeof (Number(status)) === number && Number(status)) || 500;
        this.message = (typeof (message) === 'string' && message) || 'Internal Server Error. We should fix this soon.';
        this.name = 'CustomError';
    }
}
class ValidationError extends Error {
    constructor(message) {
        super();
        this.status = 400;
        this.message = (typeof (message) === 'string' && message) || 'Missing or invalid required request fields';
        this.name = 'CustomError';
    }
}
class UnauthorisedError extends Error {
    constructor() {
        super();
        this.status = 401;
        this.message = 'Empty or invalid bearer token. You are not authorised to perform this action';
        this.name = 'CustomError';
    }
}

module.exports = { CustomError, ValidationError, UnauthorisedError }