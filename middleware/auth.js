import { authTokens } from "../controllers/user.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import { decryptData } from "../utils/hashing.js";



export const isAuthenticatedUser = async (req, resp, next) => {
    try {
        const auth_token = req.headers['authorization'];
        if (!auth_token) {
            return next(new ErrorHandler("PLEASE LOGIN FIRST!", 401));
        };
        if(!authTokens.has(auth_token)) {
            return next(new ErrorHandler("PLEASE LOGIN FIRST!", 401));
        };

        const decode = decryptData(auth_token);
        if (!decode) {
            return next(new ErrorHandler("PLEASE LOGIN FIRST!", 401));
        };

        const user = await User.findOne(Number(decode));
        if (!user) {
            return next(new ErrorHandler("PLEASE LOGIN FIRST!", 401));
        };

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};


export const isAutherizeRole = (...roles) => {
    return (req, resp, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler('YOUR NOT ALLOWED TO ACCESS THIS RESOURCE!', 403));
        };

        next();
    };
};

