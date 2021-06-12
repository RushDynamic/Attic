import dotenv from 'dotenv';
dotenv.config();
// TODO: Remove this for prod

import express from 'express';
import mongoose from 'mongoose';
import notesRoutes from './routes/notes-routes.js';
import accountRoutes from './routes/account-routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const DB_URI = "mongodb+srv://rush:test123@cluster0.wd2a1.mongodb.net/storage-data?retryWrites=true&w=majority";
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) =>
        // Start listening only after establishing mongoDB connection
        app.listen(3001, () => {
            console.log("App started on port 3001");
        }))
    .catch((err) => { console.log(err) });

// CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/storage', notesRoutes);
app.use('/account', accountRoutes);