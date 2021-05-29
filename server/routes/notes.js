import express from 'express';
import { getNotes, addNote, deleteNote } from '../controllers/notes.js';

const router = express.Router();

router.get('/fetch', getNotes);
router.get('/add', addNote);
router.get('/delete/:id', deleteNote);
export default router;