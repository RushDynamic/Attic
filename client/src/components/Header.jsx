import React, { useContext } from "react";
import { useHistory } from "react-router";
import { IconButton, Tooltip } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from "../styles.js";
import { UserContext } from "./UserContext.jsx";

function Header() {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const logout = () => {
        fetch("http://localhost:3001/account/logout/", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success == true) {
                    history.push('/login');
                    setUser({ username: null, accessToken: null });
                }
                else {
                    //show snackbar alert
                }
            })
            .catch((err) => { });
    }

    const classes = useStyles();
    return (
        <div>
            <header className={classes.header_container}>
                <img className={classes.header_logo} src={process.env.PUBLIC_URL + '/img/Attic-Header.png'} alt="header_logo" />
                {(user.username != null)
                    ? (<Tooltip title={`Logout: ${user.username}`} aria-label="locked"><IconButton className={classes.btnLogout} onClick={() => logout()} >
                        <ExitToAppIcon />
                    </IconButton></Tooltip>)
                    : (<Tooltip title="You're not logged in" aria-label="locked"><LockIcon /></Tooltip>)}
            </header>
        </div>
    );
}

export default Header;