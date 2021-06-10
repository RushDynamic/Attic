import express from 'express';
import { loginUser, registerUser, checkLoginStatus } from '../controllers/account.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/logged_in', checkLoginStatus)
router.post('/logout', () => { });
export default router;