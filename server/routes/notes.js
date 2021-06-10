import express from 'express';
import { authenticateToken } from '../controllers/auth.js';
import { getNotes, addNote, deleteNote, updateNote } from '../controllers/notes.js';

const router = express.Router();

router.get('/fetch', authenticateToken, getNotes);
router.get('/add', authenticateToken, addNote);
router.get('/delete/:id', authenticateToken, deleteNote);
router.post('/update', authenticateToken, updateNote);
export default router;