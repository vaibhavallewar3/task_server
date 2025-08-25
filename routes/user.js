import express from 'express';
import { getAllUsers, loginUser, logoutUser, myProfile, registerUser } from '../controllers/user.js';
import { isAuthenticatedUser, isAutherizeRole } from '../middleware/auth.js';



const router = express.Router();


//PUBLIC ROUTES
router.post('/register', registerUser);

router.post('/login', loginUser);


// AUTH ROUTES
router.use(isAuthenticatedUser);

router.get('/myprofile', myProfile);

router.get('/logout', logoutUser);

router.get('/get', isAutherizeRole('admin'), getAllUsers);



export default router;

