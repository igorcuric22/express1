const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Route to serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web2.html'));
});

// Endpoint to stream a text file
app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sample.txt');

    // Set headers
    res.setHeader('Content-Type', 'text/plain');
    
    // Create a readable stream and pipe it to the response
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    
    // Handle stream errors
    readStream.on('error', (err) => {
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
