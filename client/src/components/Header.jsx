import React from "react";
import { Typography, CssBaseline } from "@material-ui/core";
import useStyles from "../styles.js";

function Header() {
    const classes = useStyles();
    return (
        <div>
            <header className={classes.header_container}>
                <img className={classes.header_logo} src={process.env.PUBLIC_URL + '/img/Attic-Header.png'} />
            </header>
        </div>
    );
}

export default Header;