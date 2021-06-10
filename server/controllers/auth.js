import jwt from 'jsonwebtoken';
import { AuthToken } from '../models/auth-token.js';

export function generateAccessToken(username) {
    return jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}

export function generateRefreshToken(username) {
    return jwt.sign({ name: username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20d' });
}

// export function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.status(401).json({ error: "Not authenticated" })
//     console.log(req.cookies);
//     //console.log(req.signedCookies);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: "Not authorized to access this resource." })
//         req.user = user;
//         next();
//     });
// }

export function authenticateToken(req, res, next) {
    console.log("Method: authenticateToken()");
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
                    next();
                })
            });
        }
        else next();
    })
}

export async function verifyAccessToken(accessToken) {
    if (accessToken == null || accessToken == "null") return false;
    console.log("Method: verifyAccessToken()");
    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return false;
    }
    catch (err) {
        return true;
    }
}

export async function verifyRefreshToken(refreshToken) {
    return await AuthToken.findOne({
        refreshToken: refreshToken
    });
}