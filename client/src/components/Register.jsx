import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import useStyles from "../styles.js";
import { Typography, TextField, Container, Card, Grid, CardContent, Button, Box } from "@material-ui/core";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { registerUser } from './services/register-service.js';
import { UserContext } from "./UserContext.jsx";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
    const classes = useStyles();
    const [userData, setUserData] = useState({ email: "", username: "", password: "" });
    const [regState, setRegState] = useState({ regInProgress: false, showSuccessAlert: false, showFailureAlert: false });
    const [failureMsg, setFailureMsg] = useState("An error occured");
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    // TODO: Update alert for unsuccessful registration as well

    useEffect(() => {
        if (user.accessToken != null && user.username != null) {
            history.push('/');
        }
    }, [user]);

    useEffect(() => {
        // Invoke backend and check if stored jwt refresh token is valid
        checkLoginStatus();
    }, [])

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
                if (data.logged_in === true) {
                    setUser({ username: data.username, accessToken: data.accessToken });
                }
                else {
                    setUser({ username: null, accessToken: null });
                    history.push('/register');
                }
            })
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Card className={classes.Card}>
                    <CardContent>
                        <Typography className={classes.Typography} variant="h5" gutterBottom>
                            <Box fontFamily="Raleway">
                                Create an account
                            </Box>
                        </Typography>
                        <Grid container spacing={1} className={classes.text_field_container}>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" required fullWidth variant="outlined" label="Email" onChange=
                                    {
                                        event => setUserData(
                                            {
                                                email: event.target.value,
                                                username: userData.username,
                                                password: userData.password
                                            }
                                        )} />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" required fullWidth variant="outlined" label="Username" onChange=
                                    {
                                        event => setUserData(
                                            {
                                                email: userData.email,
                                                username: event.target.value,
                                                password: userData.password
                                            }
                                        )} />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" required fullWidth variant="outlined" label="Password" type="password" onChange=
                                    {
                                        event => setUserData(
                                            {
                                                email: userData.email,
                                                username: userData.username,
                                                password: event.target.value
                                            }
                                        )} />
                            </Grid>
                            <Grid item>
                                <div className={classes.login_buttons_container}>
                                    <Button variant="contained" color="primary" disabled={regState.regInProgress} className={classes.btn_login} onClick={() => registerUser(userData, setRegState, setUser, setFailureMsg)}>
                                        Register
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.btn_register} component={Link} to="/login">
                                        Login
                                    </Button>
                                </div>
                            </Grid>
                            <Snackbar open={regState.showSuccessAlert} autoHideDuration={3000} onClose={() => setRegState({ regInProgress: false, showSuccessAlert: false, showFailureAlert: false })}>
                                <Alert severity="success">
                                    You have successfully registered!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={regState.showFailureAlert} autoHideDuration={3000} onClose={() => setRegState({ regInProgress: false, showSuccessAlert: false, showFailureAlert: false })}>
                                <Alert severity="error">
                                    {failureMsg}
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Register;