import React from 'react';
import { Card, CardContent, CardHeader, CardActions, IconButton, Typography, TextField } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import useStyles from "../styles.js";

function StorageCard(props) {
    const classes = useStyles();
    return (
        <div>
            <Card elevation={3}>
                <CardHeader
                    title={
                        props.jsonData.first_name + " " + props.jsonData.last_name
                    }
                    subheader={
                        props.jsonData.ip_address
                    }
                // action={
                //     <IconButton onClick={() => props.handleDeleteStorage(props)}>
                //         <DeleteOutlined />
                //     </IconButton>
                // }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {props.jsonData.email}
                    </Typography>
                </CardContent>

                <CardActions>
                    <div className={classes.actions_container}>
                        <IconButton>
                            <EditOutlined />
                        </IconButton>
                        <IconButton onClick={() => props.handleDeleteStorage(props)}>
                            <DeleteOutlined />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}

export default StorageCard;