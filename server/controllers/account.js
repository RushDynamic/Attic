import { User } from '../models/users.js';
import bcrypt from 'bcrypt';

export function registerUser(req, res) {
    hashPassword(req.body.password)
        .then((hashedPassword) => {
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            })

            newUser.save()
                .then((result) => {
                    res.send(result);
                    console.log("User registered successfully")
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send();
                });
        })
}

export function loginUser(req, res) {
    User.findOne(
        {
            username: req.body.username
        }
    )
        .then((registeredUser) => {
            console.log(registeredUser);
            if (registeredUser == null) {
                res.status(400).send("User not found!");
            }
            else {
                try {
                    bcrypt.compare(req.body.password, registeredUser.password).then((validCredentials) => {
                        if (validCredentials) {
                            res.status(200).send("Successfully logged in!");
                        }
                        else {
                            res.status(400).send("Invalid credentials!");
                        }
                    })
                }
                catch (err) {
                    console.log(err);
                    res.status(500).send("An error occured");
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("An error occured");
        })
}

async function hashPassword(rawPassword) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(rawPassword, salt);
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}