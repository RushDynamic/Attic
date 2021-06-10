import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Typography, LinearProgress } from '@material-ui/core';
import useStyles from "../styles.js";
import StorageCard from './StorageCard.jsx';
import { UserContext } from './UserContext.jsx';

function Storage() {
    const [sampleData, setSampleData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (user.accessToken != null) {
            fetchPosts();
        }
    }, [user]);

    // Handle 403 errors for update and delete
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
                title: _newData.title,
                text: _newData.text
            })
        }).then(() => {
            console.log("Finished update request");
        })
    }

    function fetchPosts() {
        console.log("Inside fetch posts ", user)
        fetch("http://localhost:3001/storage/fetch", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
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
                if (data.logged_in == true) {
                    setUser({ username: user.username, accessToken: data.accessToken });
                }
                else {
                    setUser({});
                    history.push('/login');
                }
            })
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {
                    loaded ? (sampleData.length === 0 ? <Container className={classes.notes_default_container}><Typography variant="h2" >No notes to display :(</Typography></Container> : sampleData.map(data => (
                        <Grid item md={3} sm={6} xs={12}>
                            <StorageCard jsonData={data} handleDeleteStorage={handleDeleteStorage} handleUpdateStorage={handleUpdateStorage} />
                        </Grid>
                    ))) : <Container className={classes.loading_container}><LinearProgress classes={{ colorPrimary: classes.progressBarColorPrimary, barColorPrimary: classes.progressBarProgressColorPrimary }} /></Container>
                }
            </Grid>
        </Container >
    );
}

export default Storage;