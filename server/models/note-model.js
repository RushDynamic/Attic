// 1. Define a schema
// 2. Define a model based on that schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        username: { type: String, required: true },
        note_title: { type: String, required: true },
        note_body: { type: String, required: true },
        last_edited: { type: String, required: true },
    },
    {
        timestamps: true
    });

export const Note = mongoose.model('notes', noteSchema);

//module.exports = Note;