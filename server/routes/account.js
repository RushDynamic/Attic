import express from 'express';
import { loginUser, logoutUser, registerUser, checkLoginStatus } from '../controllers/account.js';
import { authenticateToken } from '../controllers/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/logout', authenticateToken, logoutUser);
router.post('/logged_in', checkLoginStatus)
export default router;