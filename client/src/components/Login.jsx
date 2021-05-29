import React from "react";
import useStyles from "../styles.js";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Typography, TextField, Container, Card, Grid, CardActions, CardContent, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'

function Login() {
    const classes = useStyles();
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
                                <TextField className={classes.TextField} margin="normal" fullWidth variant="outlined" label="Username" />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" fullWidth variant="outlined" label="Password" />
                            </Grid>
                            <Grid item>
                                <div className={classes.login_buttons_container}>
                                    <Button variant="contained" color="primary" className={classes.btn_login}>
                                        Login
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.btn_register} component={Link} to="/register">
                                        Register
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Login;