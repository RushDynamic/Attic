import express from 'express';
import mongoose from 'mongoose';
import notesRoutes from './routes/notes.js';
import accountRoutes from './routes/account.js';
import bodyParser from 'body-parser';

const app = express();

const DB_URI = "mongodb+srv://rush:test123@cluster0.wd2a1.mongodb.net/storage-data?retryWrites=true&w=majority";
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) =>
        // Start listening only after establishing mongoDB connection
        app.listen(3001, () => {
            console.log("App started on port 3001");
        }))
    .catch((err) => { console.log(err) });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/storage', notesRoutes);
app.use('/account', accountRoutes);