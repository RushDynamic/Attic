import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, IconButton, Typography, TextField, Collapse } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, CloseOutlined, DoneOutlined } from '@material-ui/icons';
import useStyles from "../styles.js";

function StorageCard(props) {
    const classes = useStyles();
    const [editCard, setEditCard] = useState(false);
    const [currentData, setCurrentData] = useState({ title: props.jsonData.note_title, body: props.jsonData.note_body, edited: props.jsonData.last_edited })
    const [storedData, setStoredData] = useState({ title: props.jsonData.note_title, body: props.jsonData.note_body, edited: props.jsonData.last_edited });
    useEffect(() => {
        setCurrentData({ title: props.jsonData.note_title, body: props.jsonData.note_body, edited: props.jsonData.last_edited });
    }, [props.jsonData.note_title, props.jsonData.note_body])

    return (
        <div>
            <Card elevation={3}>
                <Collapse in={!editCard}>
                    <CardHeader
                        title={
                            currentData.title
                        }
                        subheader={
                            currentData.edited
                        }
                        subheaderTypographyProps={{ variant: 'subtitle2' }}
                    />
                    <CardContent>
                        <Typography variant="body1" color="textSecondary">
                            {currentData.body}
                        </Typography>
                    </CardContent>
                </Collapse>
                <Collapse in={editCard}>
                    <CardHeader
                        title={
                            <TextField value={currentData.title} fullWidth={true} onChange={event => setCurrentData({ title: event.target.value, body: currentData.body, edited: new Date().toLocaleString() })} />
                        }
                    />
                    <CardContent>
                        <TextField value={currentData.body} multiline rowsMax={6} fullWidth={true} onChange={event => setCurrentData({ title: currentData.title, body: event.target.value, edited: new Date().toLocaleString() })} />
                    </CardContent>
                </Collapse>

                <Collapse in={!editCard}>
                    <CardActions>
                        <div className={classes.actions_container}>
                            <IconButton onClick={() => setEditCard(!editCard)}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton onClick={() => props.handleDeleteStorage(props.jsonData._id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </div>
                    </CardActions>
                </Collapse>
                <Collapse in={editCard}>
                    <CardActions>
                        <div className={classes.actions_container}>
                            <IconButton onClick={() => {
                                setEditCard(!editCard);
                                props.handleUpdateStorage(props.jsonData._id, currentData);
                                setStoredData({ title: currentData.title, body: currentData.body, edited: currentData.edited });
                            }}>
                                <DoneOutlined />
                            </IconButton>
                            <IconButton onClick={() => {
                                setEditCard(!editCard);
                                setCurrentData({ title: storedData.title, body: storedData.body })
                            }}>
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