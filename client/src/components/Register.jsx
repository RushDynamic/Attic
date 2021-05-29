import React from "react";
import useStyles from "../styles.js";
import { Typography, TextField, Container, Card, Grid, CardActions, CardContent, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'

function Register() {
    const classes = useStyles();
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
                                <TextField className={classes.TextField} margin="normal" required fullWidth variant="outlined" label="Username" />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" required fullWidth variant="outlined" label="Email" />
                            </Grid>
                            <Grid item>
                                <TextField className={classes.TextField} margin="normal" required fullWidth variant="outlined" label="Password" />
                            </Grid>
                            <Grid item>
                                <div className={classes.login_buttons_container}>
                                    <Button variant="contained" color="primary" className={classes.btn_login}>
                                        Register
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.btn_register} component={Link} to="/">
                                        Login
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

export default Register;