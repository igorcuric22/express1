const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

let chunks = [];

app.use(bodyParser.raw({ type: 'video/mp4', limit: '10mb' }));

// Endpoint to receive video chunks
app.post('/upload', (req, res) => {
    const chunk = req.body;
    chunks.push(chunk);
    res.status(200).send('Chunk received');
});

// Endpoint to get video chunks
app.get('/chunks', (req, res) => {
    res.status(200).json(chunks);
});

// Serve the client HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','browser7.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
