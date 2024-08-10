const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Define the port to run the server
const fs = require('fs');

// Serve static files from the "public" directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stop1.html'));
});

// Route to serve the media segment
app.get('/media/:segment', (req, res) => {
    const segment = req.params.segment;
    const filePath = path.join(__dirname, 'media', segment);

    // const readStream = fs.createReadStream(filePath);

    // // Handle stream events
    // readStream.on('open', () => {
    //     readStream.pipe(res);
    // });


    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('Media segment not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
