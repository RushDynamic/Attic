import { Registration } from '../models/registration.js';

export function registerUser(req, res) {
    const registeredUser = new Registration({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    registeredUser.save()
        .then((result) => {
            res.send(result);
            console.log("User registered successfully")
        })
        .catch((err) => console.log(err));
}