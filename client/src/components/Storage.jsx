import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Typography, LinearProgress, TextField, Snackbar, IconButton, Card, CardContent, CardHeader, CardActions, Collapse } from '@material-ui/core';
import { CloseOutlined, DoneOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "../styles.js";
import StorageCard from './StorageCard.jsx';
import { UserContext } from './UserContext.jsx';

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
        checkLoginStatus();
    }, []);

    // TODO: Find better way to call fetchPosts()
    useEffect(() => {
        if (user.accessToken != null) {
            fetchPosts();
        }
    }, [user]);

    // TODO: Move actual logic for create, update and delete to service classes
    // TODO:Handle 403 errors for update and delete
    function handleDeleteStorage(_id) {
        fetch("http://localhost:3001/storage/delete/" + _id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
            credentials: 'include'
        }).then(() => {
            console.log("Finished delete request");
            const filteredSampleData = sampleData.filter(data => data._id !== _id);
            console.log(filteredSampleData);
            setSampleData(filteredSampleData);
        });
    }

    function handleUpdateStorage(_id, _newData) {
        fetch("http://localhost:3001/storage/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            credentials: 'include',
            body: JSON.stringify({
                id: _id,
                note_title: _newData.title,
                note_body: _newData.body,
                last_edited: _newData.edited
            })
        }).then(() => {
            console.log("Finished update request");
        })
    }

    function handleCreateNote() {
        fetch("http://localhost:3001/storage/add", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                username: user.username,
                note_title: currentData.title,
                note_body: currentData.body,
                last_edited: currentData.edited
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // show a successful alert
                    fetchPosts();
                    setExpandNewNote(!expandNewNote);
                    setCurrentData({ title: "", body: "", edited: "" });
                }
                else {
                    // show an unsuccessful alert
                }
            })
    }

    function checkLoginStatus() {
        fetch("http://localhost:3001/account/logged_in", {
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

    function fetchPosts() {
        fetch("http://localhost:3001/storage/fetch", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user.username }),
            credentials: 'include'
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 403) {
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