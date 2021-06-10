import { User } from '../models/users.js';
import { AuthToken } from '../models/auth-token.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from './auth.js';
import jwt from 'jsonwebtoken';

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
                res.status(400).json(
                    {
                        authenticated: false,
                        accessToken: null
                    }
                );
            }
            else {
                try {
                    bcrypt.compare(req.body.password, registeredUser.password).then((validCredentials) => {
                        if (validCredentials) {

                            const accessToken = generateAccessToken(registeredUser.username);
                            const refreshToken = generateRefreshToken(registeredUser.username);

                            // TODO: Check if authtoken already exists, if so update existing record
                            const newToken = new AuthToken({
                                username: registeredUser.username,
                                refreshToken: refreshToken
                            })
                            newToken.save()
                                .then(() => {
                                    res.cookie('refreshToken', refreshToken, { sameSite: 'strict', path: '/', httpOnly: true });
                                    res.status(202).json(
                                        {
                                            authenticated: true,
                                            accessToken: accessToken
                                        }
                                    );
                                    console.log("Successfully logged in!");
                                })
                        }
                        else {
                            console.log("Invalid credentials!");
                            res.status(400).json(
                                {
                                    authenticated: false,
                                    accessToken: null
                                }
                            );
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

export function checkLoginStatus(req, res) {
    console.log("Method: checkLoginStatus()");
    const refreshToken = req.cookies.refreshToken;
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (refreshToken == null) return res.status(401).json({ logged_in: "false" });
    verifyAccessToken(accessToken).then((result) => {
        console.log("verifyAccessToken result: ", result);
        if (!result) {
            console.log("accessToken verification failed, verifying refreshToken");

            verifyRefreshToken(refreshToken).then((authToken) => {
                console.log("Finished verifyRefreshToken, got response");
                //console.log(authToken);
                if (authToken == null) return res.status(401).json({ logged_in: "false" });
                console.log("Finished verifying refreshToken");
                const username = authToken.username;
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.status(401).json({ logged_in: "false" });
                    const accessToken = generateAccessToken(username);
                    res.json({ logged_in: true, accessToken: accessToken });
                })
            });
        }
        else {
            res.json({ logged_in: true, accessToken: accessToken });
        }
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