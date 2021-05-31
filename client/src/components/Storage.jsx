import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, LinearProgress } from '@material-ui/core';
import useStyles from "../styles.js";
import StorageCard from './StorageCard.jsx';

function Storage() {

    const [sampleData, setSampleData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        fetch("http://localhost:3001/storage/fetch")
            .then(res => res.json())
            .then(data => {
                setSampleData(data);
                setLoaded(true);
            });
    }, []);

    function handleDeleteStorage(id) {
        fetch("http://localhost:3001/storage/delete/" + id, {
            method: 'GET'
        }).then(() => {
            console.log("Finished delete request");
            const filteredSampleData = sampleData.filter(data => data._id !== id);
            console.log(filteredSampleData);
            setSampleData(filteredSampleData);
        });
    }

    function handleUpdateStorage(_id, _title) {
        fetch("http://localhost:3001/storage/update", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: _id,
                title: _title
            })
        }).then(() => {
            console.log("Finished update request");
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