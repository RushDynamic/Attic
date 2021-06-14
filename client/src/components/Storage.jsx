import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Typography, LinearProgress, TextField, Snackbar, IconButton, Card, CardContent, CardHeader, CardActions, Collapse } from '@material-ui/core';
import { CloseOutlined, DoneOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "../styles.js";
import StorageCard from './StorageCard.jsx';
import { UserContext } from './UserContext.jsx';
import { createNote, deleteNote, fetchNotes, updateNote } from '../services/storage-service.js';
import { ATTIC_CONSTANTS, SERVER_ENDPOINTS } from '../constants/attic-constants.js'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Storage() {
    const [sampleData, setSampleData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentData, setCurrentData] = useState({ title: null, body: null, edited: null })
    const [showLoggedInAlert, setShowLoggedInAlert] = useState(false);
    const [expandNewNote, setExpandNewNote] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        console.log(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.UPDATE_NOTE}`);
        checkLoginStatus();
    }, []);

    // TODO: Find better way to call fetchPosts()
    useEffect(() => {
        if (user.accessToken != null) {
            handleFetchNotes();
        }
    }, [user]);

    // TODO: Move actual logic for create, update and delete to service classes
    // TODO:Handle 403 errors for update and delete
    function handleDeleteStorage(_id) {
        deleteNote(_id, user).then((result) => {
            if (result) {
                console.log("Finished delete request");
                const filteredSampleData = sampleData.filter(data => data._id !== _id);
                console.log(filteredSampleData);
                setSampleData(filteredSampleData);
            }
            else {
                console.log("Could not delete note");
                // show error alert
            }
        });
    }

    function handleUpdateStorage(_id, _newData) {
        updateNote(_id, _newData, user).then((result) => {
            if (result) {
                console.log("Finished update request");
            }
            else {
                // show error alert
            }
        })
    }

    function handleCreateNote() {
        createNote(currentData, user).then((result) => {
            if (result) {
                handleFetchNotes();
                setExpandNewNote(!expandNewNote);
                setCurrentData({ title: "", body: "", edited: "" });
            }
            else {
                // show an unsuccessful alert
            }
        });
    }

    function handleFetchNotes() {
        fetchNotes(user).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else if (response.status === 403) {
                history.push('/login')
            }
            else return null;
        })
            .then(fetchedContent => {
                if (fetchedContent != null) {
                    console.log(fetchedContent);
                    setSampleData(fetchedContent);
                    setLoaded(true);
                }
                else {
                    setLoaded(true);
                    setSampleData([]);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoaded(false);
            });
    }

    function checkLoginStatus() {
        fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.LOGGED_IN}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged_in === true) {
                    setUser({ username: data.username, accessToken: data.accessToken });
                    setShowLoggedInAlert(true);
                }
                else {
                    setUser({ username: null, accessToken: null });
                    history.push('/login');
                }
            })
    }

    return (
        <Container>
            <div className={classes.newNoteContainer}>
                <Collapse in={!expandNewNote} >
                    <IconButton onClick={() => setExpandNewNote(!expandNewNote)} className={classes.newNoteButton}>
                        <AddIcon style={{ fontSize: 75 }} />
                    </IconButton>
                </Collapse>
                {/* Actual input fields go here */}
                <Collapse in={expandNewNote}>
                    <Card elevation={1}>
                        <CardHeader
                            title={
                                <div>
                                    <Typography variant={"subtitle2"} style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        New note
                                    </Typography>
                                    <TextField
                                        fullWidth={true}
                                        label="Title"
                                        value={currentData.title}
                                        onChange={event => setCurrentData({ title: event.target.value, body: currentData.body, edited: new Date().toLocaleString() })}
                                    />
                                </div>
                            }
                        />
                        <CardContent>
                            <TextField
                                fullWidth={true}
                                multiline rows={6}
                                label={currentData.body === "" ? "Type something here..." : ""}
                                size="large"
                                variant="outlined"
                                InputLabelProps={{ shrink: false }}
                                value={currentData.body}
                                onChange={event => setCurrentData({ title: currentData.title, body: event.target.value, edited: new Date().toLocaleString() })}
                            />
                        </CardContent>
                        <CardActions>
                            <div className={classes.actions_container}>
                                <IconButton onClick={() => handleCreateNote()}>
                                    <DoneOutlined />
                                </IconButton>
                                <IconButton onClick={() => setExpandNewNote(!expandNewNote)}>
                                    <CloseOutlined />
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>
                </Collapse>
            </div>
            <Grid container spacing={3}>
                {
                    loaded ? (sampleData.length === 0 ? <Container className={classes.notes_default_container}><Typography variant="h2" >No notes to display :(</Typography></Container> : sampleData.map(data => (
                        <Grid item md={3} sm={6} xs={12}>
                            <StorageCard jsonData={data} handleDeleteStorage={handleDeleteStorage} handleUpdateStorage={handleUpdateStorage} />
                        </Grid>
                    ))) : <Container className={classes.loading_container}><LinearProgress classes={{ colorPrimary: classes.progressBarColorPrimary, barColorPrimary: classes.progressBarProgressColorPrimary }} /></Container>
                }
                <Snackbar open={showLoggedInAlert} autoHideDuration={3000} onClose={() => setShowLoggedInAlert(false)}>
                    <Alert severity="success">
                        {`You're logged in as ${user.username}`}
                    </Alert>
                </Snackbar>
            </Grid>
        </Container >
    );
}

export default Storage;