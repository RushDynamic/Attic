import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import useStyles from "../styles.js"
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Storage from "./Storage.jsx";
import Footer from "./Footer.jsx";
import { UserContext } from "./UserContext.jsx";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {

  const [user, setUser] = useState({ username: null, accessToken: null });

  const classes = useStyles();

  //background-color: #1fd1f9;
  //background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#1fd1f9',
      },
      secondary: {
        main: '#b621fe',
      },
      background: {
        default: '#1b1d1e',
        paper: '#181a1b',
      },
      text: {
        primary: '#cdcbc9',
        secondary: '#a8a8a8',
      },
    },
  });
  return (
    <>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className={classes.mainContainer}>
            <UserContext.Provider value={{ user, setUser }}>
              <Header />
              <Switch>
                <Route path="/" exact component={Storage} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
              </Switch>
            </UserContext.Provider>
            <Footer />
          </div>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
