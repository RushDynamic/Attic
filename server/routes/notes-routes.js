import express from 'express';
import { authenticateToken } from '../services/auth-service.js'
import { getNotes, addNote, deleteNote, updateNote } from '../controllers/notes-controller.js';

const router = express.Router();

router.post('/fetch', authenticateToken, getNotes);
router.post('/add', authenticateToken, addNote);
router.get('/delete/:id', authenticateToken, deleteNote);
router.post('/update', authenticateToken, updateNote);
export default router;