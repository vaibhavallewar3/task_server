import express from 'express';
import { getAllUsers, loginUser, logoutUser, myProfile, registerUser } from '../controllers/user.js';
import { isAuthenticatedUser, isAutherizeRole } from '../middleware/auth.js';
import { createTask, createTaskOpts, deleteTask, editTask, getAllBlockedTasks, getAllTasks, getMyTasks, getTaskById } from '../controllers/task.js';



const router = express.Router();


// AUTH ROUTES
router.use(isAuthenticatedUser);

router.get('/get/my', getMyTasks);

router.get('/get/:id', getTaskById);

router.put('/edit/:id', editTask);

router.get('/options/create', createTaskOpts);


// ADMIN ROUTES
router.get('/get', isAutherizeRole('admin'), getAllTasks);

router.get('/get/blocked', isAutherizeRole('admin'), getAllBlockedTasks);

router.post('/create', isAutherizeRole('admin'), createTask);

router.delete('/delete/:id', isAutherizeRole('admin'), deleteTask);



export default router;

