import { Note } from '../models/note-model.js';
import faker from 'faker';

// TODO: Handle error response properly
export function getNotes(req, res) {
    console.log("Method: getNotes()");
    Note.find({
        username: req.body.username
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
}

export function addNote(req, res) {
    // Randomize seed based on current time to get new values everytime
    const note = new Note({
        username: req.body.username,
        note_title: req.body.note_title,
        note_body: req.body.note_body,
        last_edited: req.body.last_edited
    });

    note.save()
        .then((result) => {
            res.status(200).json({
                msg: "Note saved successfully",
                success: true
            })
        })
        .catch((err) => {
            console.log("An error occurred while saving the post ", err);
            res.status(500).json({
                msg: "An error occurred while saving your note",
                success: false
            })
        })


    // faker.seed(new Date().getTime())
    // const note = new Note({
    //     id: faker.datatype.uuid(),
    //     name: faker.name.findName(),
    //     text: faker.lorem.paragraph(),
    //     gender: faker.name.gender(),
    //     ip_address: faker.internet.ip()
    // });

    // note.save()
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((err) => console.log(err));
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
        {
            note_title: req.body.note_title,
            note_body: req.body.note_body,
            last_edited: req.body.last_edited
        },
        { useFindAndModify: false })
        .catch((err) => { console.log(err) });
    console.log("Updated record");
    res.send(req.body.title);
}