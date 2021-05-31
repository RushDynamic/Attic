import express from 'express';
import { getNotes, addNote, deleteNote, updateNote } from '../controllers/notes.js';

const router = express.Router();

router.get('/fetch', getNotes);
router.get('/add', addNote);
router.get('/delete/:id', deleteNote);
router.post('/update', updateNote);
export default router;