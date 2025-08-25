import User from '../models/user.js';
import ErrorHandler from '../utils/error.js';
import { encryptData } from '../utils/hashing.js';

export const authTokens = new Set();

export const registerUser = async (req, resp, next) => {
    try {
        const { name, email, password, address, gender, role } = req.body || {};
        if (!name || !email || !password || !gender) {
            return next(new ErrorHandler('FIELDS REQUIRED!', 400));
        };

        const user = await User.create({ name, email, password, address, gender, role });
        if (!user) {
            return next(new ErrorHandler('INTERNAL SERVER ERROR!', 500));
        };

        resp.status(201).json({ success: true, message: 'REGISTER SUCCESSFULLY!' });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};



export const loginUser = async (req, resp, next) => {
    try {
        const { email, password } = req.body || {};

        const user = await User.findAllByEmail(email);
        if (!user) {
            return next(new ErrorHandler('INVALID EMAIL!', 400));
        };
        
        const isMatch = user.password === password;
        if (!isMatch) {
            return next(new ErrorHandler('INVALID PASSWORD!', 400));
        };

        const token = await encryptData(String(user?.id));
        authTokens.add(token);

        resp.status(200).json({ success: true, message: 'HELLO ' + user?.name?.toUpperCase(), token, role: user?.role });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};



export const myProfile = async (req, resp, next) => {
    try {
        const user = await User.findOne(req.user.id);

        resp.status(200).json({ success: true, user });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};


export const logoutUser = async (req, resp, next) => {
    try {
        const token = req.headers['authorization'];
        authTokens.delete(token);

        resp.status(200).json({ success: true, message: 'USER LOGGED OUT SUCCESSFULLY!' });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};


export const getAllUsers = async (req, resp, next) => {
    try {
        const users = await User.findAll();

        resp.status(200).json({ success: true, users });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};


