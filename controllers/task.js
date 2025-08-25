import User from '../models/user.js';
import Task from '../models/task.js';
import ErrorHandler from '../utils/error.js';


// ALL TASKS LIST
export const getAllTasks = async (req, resp, next) => {
    try {
        const tasks = await Task.findAll();

        resp.status(200).json({ success: true, tasks });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};


// ALL TASKS LIST
export const getAllBlockedTasks = async (req, resp, next) => {
    try {
        const tasks = await Task.findAllBlock();

        resp.status(200).json({ success: true, tasks });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};



// SINGLE TASK
export const getTaskById = async (req, resp, next) => {
    try {
        const task = await Task.findOne(Number(req.params.id));

        resp.status(200).json({ success: true, task });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};



// SHOW ALL MY TASKS
export const getMyTasks = async (req, resp, next) => {
    try {
        const tasks = await Task.findAllMy(req.user.id);

        resp.status(200).json({ success: true, tasks });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};



// CREATE TASK
export const createTask = async (req, resp, next) => {
    try {
        const { title, description, priority, status, sub_tasks, assign_to } = req.body || {};

        if (!title || !priority || !status || !assign_to) {
            return next(new ErrorHandler('FIELDS ARE REEQUIRED!', 400));
        };

        const task = await Task.create({ title, description, priority, status, sub_tasks, assign_by: req.user.id, assign_to: Number(assign_to) });
        if (!task) {
            return next(new ErrorHandler('INTERNAL SERVER ERROR!', 500));
        };

        resp.status(201).json({ success: true, message: 'TASK CREATED!' });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};




// UPDATE TASK
export const editTask = async (req, resp, next) => {
    try {
        const { title, description, priority, status, assign_to, sub_tasks } = req.body || {};

        if (!title || !priority || !status || !assign_to) {
            return next(new ErrorHandler('FIELDS ARE REEQUIRED!', 400));
        };

        const is_updated = await Task.update(req.params.id, { title, description, priority, status, assign_by: req.user.id, assign_to: Number(assign_to), sub_tasks });
        if (!is_updated) {
            return next(new ErrorHandler('INTERNAL SERVER ERROR!', 500));
        };

        resp.status(201).json({ success: true, message: 'TASK UPDATED!' });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};




// DELETE TASK
export const deleteTask = async (req, resp, next) => {
    try {
        const is_deleted = await Task.delete(Number(req.params.id));
        if (!is_deleted) {
            return next(new ErrorHandler('INTERNAL SERVER ERROR!', 500));
        };
        resp.status(200).json({ success: true, message: 'TASK DELETED!' });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};



// DELETE TASK
export const createTaskOpts = async (req, resp, next) => {
    try {
        const users = await User.findAllUser();

        resp.status(200).json({ success: true, users });
    } catch (error) {
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};