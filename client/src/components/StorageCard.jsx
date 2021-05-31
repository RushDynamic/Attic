import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, IconButton, Typography, TextField, Collapse } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, CloseOutlined, DoneOutlined } from '@material-ui/icons';
import useStyles from "../styles.js";

function StorageCard(props) {
    const classes = useStyles();
    const [editTitle, setEditTitle] = useState(false);
    const [postTitle, setPostTitle] = useState(props.jsonData.name);

    return (
        <div>
            <Card elevation={3}>
                <Collapse in={!editTitle}>
                    <CardHeader
                        title={
                            postTitle
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
                </Collapse>
                <Collapse in={editTitle}>
                    <CardHeader
                        title={
                            <TextField value={postTitle} onChange={event => setPostTitle(event.target.value)} />
                        }
                    />
                </Collapse>
                < CardContent >
                    <Typography variant="body2" color="textSecondary">
                        {props.jsonData.text}
                    </Typography>
                </CardContent>
                <Collapse in={!editTitle}>
                    <CardActions>
                        <div className={classes.actions_container}>
                            <IconButton onClick={() => {
                                setEditTitle(!editTitle);

                            }}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton onClick={() => props.handleDeleteStorage(props.jsonData._id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </div>
                    </CardActions>
                </Collapse>
                <Collapse in={editTitle}>
                    <CardActions>
                        <div className={classes.actions_container}>
                            <IconButton onClick={() => {
                                setEditTitle(!editTitle);
                                props.handleUpdateStorage(props.jsonData._id, postTitle);
                            }}>
                                <DoneOutlined />
                            </IconButton>
                            <IconButton>
                                <CloseOutlined />
                            </IconButton>
                        </div>
                    </CardActions>
                </Collapse>
            </Card>
        </div>
    );
}

export default StorageCard;