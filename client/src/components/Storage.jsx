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

    function handleDeleteStorage(props) {
        fetch("http://localhost:3001/storage/delete/" + props.jsonData._id, {
            method: 'GET'
        }).then(() => {
            console.log("Finished delete request");
            const filteredSampleData = sampleData.filter(data => data._id !== props.jsonData._id);
            console.log(filteredSampleData);
            setSampleData(filteredSampleData);
        });
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {
                    sampleData.map(data => (
                        <Grid item md={3} sm={6} xs={12}>
                            <StorageCard jsonData={data} handleDeleteStorage={handleDeleteStorage} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default Storage;