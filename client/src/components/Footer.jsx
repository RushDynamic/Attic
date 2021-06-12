import { Typography, Link, Box } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import useStyles from "../styles.js"

export default function Footer() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.footerBar}>
                <div className={classes.footerContainer}>
                    <Typography variant="subtitle2" className={classes.footerText}>
                        <Box letterSpacing={3} fontWeight={1000} fontSize={12}>
                            MADE WITH ❤ BY RUSH DYNAMIC
                        </Box>
                    </Typography>
                    <div className={classes.footerIcons}>
                        <Link href="https://github.com/rushdynamic" target="_blank">
                            <GitHubIcon className={classes.footerIcon} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}