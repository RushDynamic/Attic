import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const registrationSchema = new Schema(
    {
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    });

export const Registration = new mongoose.model('users', registrationSchema);