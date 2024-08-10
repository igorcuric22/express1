// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','front1.html'));
});


app.post('/upload', (req, res) => {
    let fileName = `uploads/${Date.now()}-videopp.mp4`;
    let fileStream = fs.createWriteStream(fileName);

    req.on('data', chunk => {
        fileStream.write(chunk);
    });

    req.on('end', () => {
        fileStream.end();
        res.send('Video uploaded successfully!');
    });

    req.on('error', (err) => {
        console.error('Error during file upload', err);
        res.status(500).send('Error during file upload');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});  

