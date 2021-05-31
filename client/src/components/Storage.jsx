import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import StorageCard from './StorageCard.jsx';

function Storage() {

    useEffect(() => {
        fetch("http://localhost:3001/storage/fetch")
            .then(res => res.json())
            .then(data => setSampleData(data));
    }, []);

    const [sampleData, setSampleData] = useState([]);
    console.log(sampleData);

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
                    sampleData.map(data => (
                        <Grid item md={3} sm={6} xs={12}>
                            <StorageCard jsonData={data} handleDeleteStorage={handleDeleteStorage} handleUpdateStorage={handleUpdateStorage} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default Storage;