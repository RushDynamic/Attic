import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, IconButton, Typography, TextField, Collapse } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, CloseOutlined, DoneOutlined } from '@material-ui/icons';
import useStyles from "../styles.js";

function StorageCard(props) {
    const classes = useStyles();
    const [editCard, setEditCard] = useState(false);
    const [currentData, setCurrentData] = useState({ title: props.jsonData.name, text: props.jsonData.text })
    const [storedData, setStoredData] = useState({ title: props.jsonData.name, text: props.jsonData.text });
    useEffect(() => {
        setCurrentData({ title: props.jsonData.name, text: props.jsonData.text });
    }, [props.jsonData.name, props.jsonData.text])

    return (
        <div>
            <Card elevation={3}>
                <Collapse in={!editCard}>
                    <CardHeader
                        title={
                            currentData.title
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
                        <Typography variant="body1" color="textSecondary">
                            {currentData.text}
                        </Typography>
                    </CardContent>
                </Collapse>
                <Collapse in={editCard}>
                    <CardHeader
                        title={
                            <TextField value={currentData.title} fullWidth={true} onChange={event => setCurrentData({ title: event.target.value, text: currentData.text })} />
                        }
                    />
                    <CardContent>
                        <TextField value={currentData.text} multiline rowsMax={6} fullWidth={true} onChange={event => setCurrentData({ title: currentData.title, text: event.target.value })} />
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
                                setStoredData({ title: currentData.title, text: currentData.text });
                            }}>
                                <DoneOutlined />
                            </IconButton>
                            <IconButton onClick={() => {
                                setEditCard(!editCard);
                                setCurrentData({ title: storedData.title, text: storedData.text })
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