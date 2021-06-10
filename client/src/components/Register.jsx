import React, { useState } from "react";
import useStyles from "../styles.js";
import { Typography, TextField, Container, Card, Grid, CardActions, CardContent, Button } from "@material-ui/core";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { registerUser } from './models/register.js';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
    const classes = useStyles();
    const [userData, setUserData] = useState({ email: "", username: "", password: "" });
    const [regState, setRegState] = useState({ regInProgress: false, showAlert: false });
    // TODO: Update alert for unsuccessful registration as well

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Card className={classes.Card}>
                    <CardContent>
                        <Typography className={classes.Typography} variant="h5" gutterBottom>
                            Create an account
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
                                    <Button variant="contained" color="primary" disabled={regState.regInProgress} className={classes.btn_login} onClick={() => registerUser(userData, setRegState)}>
                                        Register
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.btn_register} component={Link} to="/login">
                                        Login
                                    </Button>
                                </div>
                            </Grid>
                            <Snackbar open={regState.showAlert} autoHideDuration={4000} onClose={() => setRegState({ regInProgress: false, showAlert: false })}>
                                <Alert severity="success">
                                    You have successfully registered!
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