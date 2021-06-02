import { Typography, Container, Link } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import useStyles from "../styles.js"

export default function Footer() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.footerBar}>
                <div className={classes.footerContainer}>
                    <Typography variant="h7" className={classes.footerText}>
                        Made with ❤ by Rush Dynamic
                    </Typography>
                    <div className={classes.footerIcons}>

                        {/* TODO: Change the color of the icon */}
                        <Link href="https://github.com/rushdynamic" target="_blank">
                            <GitHubIcon classes={{ color: 'green' }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}