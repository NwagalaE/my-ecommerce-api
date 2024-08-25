"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const appError = (err, req, res, next) => {
    // Log the error stack trace
    console.error(err.stack);
    // If the error is operational, send a response with the provided status code
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        // If the error is not operational, it might be a programming error or an unknown error
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};
exports.default = appError;
