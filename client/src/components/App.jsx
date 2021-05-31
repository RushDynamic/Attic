import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from "@material-ui/core";
import useStyles from "../styles.js"
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Storage from "./Storage.jsx";
import Footer from "./Footer.jsx";

function App() {

  const classes = useStyles();
  return (
    <>
      <Router>
        <CssBaseline />
        <div className={classes.mainContainer}>
          <Header />
          <Switch>
            <Route path="/" exact component={Storage} />
            <Route path="/register" component={Register} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
