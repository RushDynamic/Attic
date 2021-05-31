import { Typography, Container } from '@material-ui/core';
import React from 'react';
import useStyles from "../styles.js"

export default function Footer() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.footerContainer}>
                <Typography variant="h7" className={classes.footerText}>
                    Made with ❤ by Rush Dynamic
                </Typography>
            </div>
        </div>
    );
}