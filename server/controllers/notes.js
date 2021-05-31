import { Note } from '../models/notes.js';
import faker from 'faker';

export function getNotes(req, res) {
    Note.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
}

export function addNote(req, res) {
    // Randomize seed based on current time to get new values everytime
    faker.seed(new Date().getTime())
    const note = new Note({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        text: faker.lorem.paragraph(),
        gender: faker.name.gender(),
        ip_address: faker.internet.ip()
    });

    note.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
}

export function deleteNote(req, res) {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then((result) => {
            console.log(result);
            res.send("Deleted note " + id);
        })
        .catch((err) => console.log(err));
}

export function updateNote(req, res) {
    Note.findOneAndUpdate({
        _id: req.body.id
    },
        { name: req.body.title },
        { useFindAndModify: false })
        .catch((err) => { console.log(err) });
    console.log("Updated record");
    res.send(req.body.title);
}