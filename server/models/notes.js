// 1. Define a schema
// 2. Define a model based on that schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    ip_address: { type: String, required: true },
}, { timestamps: true });

export const Note = mongoose.model('dummy-note', noteSchema);

//module.exports = Note;