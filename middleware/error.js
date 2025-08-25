import ErrorHandler from '../utils/error.js';

const ErrorMiddleware = (error, req, resp, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "INTERNAL SERVER ERROR!";

    // console.error(error);
    resp.status(error.statusCode).json({ success: false, message: error.message });
};


export default ErrorMiddleware;
