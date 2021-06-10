import React, { useState, useEffect, useContext } from "react";
import useStyles from "../styles.js";
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { Typography, TextField, Container, Card, Grid, CardActions, CardContent, Button } from "@material-ui/core";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom'
import { loginUser } from './models/login.js';
import { UserContext } from "./UserContext.jsx";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
    const classes = useStyles();
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [loginState, setLoginState] = useState({ loginStatus: false, showAlert: false });
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        // Invoke backend and check if stored jwt refresh token is valid
        checkLoginStatus();
    }, [])

    useEffect(() => {
        if (user.accessToken != null) {
            setLoginState({ loginStatus: true, showAlert: true });
        }
    }, [user])

    useEffect(() => {
        if (user.username != null) {
            setLoginState({ loginStatus: true, showAlert: false });
        }
        if (loginState.loginStatus) {
            history.push('/');
        }
    }, [loginState.loginStatus])

    function checkLoginStatus() {
        fetch("http://localhost:3001/account/logged_in", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged_in == true) {
                    setUser({ username: user.username, accessToken: data.accessToken });
                }
                else {
                    setUser({});
                    history.push('/login');
                }
            })
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Card className={classes.Card}>
                    <CardContent>
                        <Typography className={classes.Typography} variant="h5" gutterBottom>
                            Login to Attic.
                        </Typography>

                        <Grid container spacing={1} className={classes.text_field_container}>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" fullWidth variant="outlined" label="Username" onChange=
                                    {
                                        event => {
                                            setUserData(
                                                {
                                                    username: event.target.value,
                                                    password: userData.password
                                                })
                                        }
                                    } />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" fullWidth variant="outlined" label="Password" onChange=
                                    {
                                        event => {
                                            setUserData(
                                                {
                                                    username: userData.username,
                                                    password: event.target.value
                                                })
                                        }
                                    } />
                            </Grid>
                            <Grid item>
                                <div className={classes.login_buttons_container}>
                                    <Button variant="contained" color="primary" className={classes.btn_login} onClick={() => loginUser(userData, setLoginState, setUser)}>
                                        Login
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.btn_register} component={Link} to="/register">
                                        Register
                                    </Button>
                                </div>
                            </Grid>
                            <Snackbar open={loginState.showAlert && loginState.loginStatus} autoHideDuration={4000} onClose={() => setLoginState({ loginStatus: true, showAlert: false })}>
                                <Alert severity="success">
                                    You have successfully logged in!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={loginState.showAlert && !loginState.loginStatus} autoHideDuration={4000} onClose={() => setLoginState({ loginStatus: false, showAlert: false })}>
                                <Alert severity="error">
                                    Error while logging in
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Login;